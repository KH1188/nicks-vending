import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { collection, addDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../../lib/firebase'
import type { Venue } from '../../hooks/useVenueData'

const INPUT = "w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"

export default function AdminUploadStatement() {
  const [searchParams] = useSearchParams()
  const [venues,   setVenues]   = useState<Venue[]>([])
  const [file,     setFile]     = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [saving,   setSaving]   = useState(false)
  const [success,  setSuccess]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  const [form, setForm] = useState({
    venueId:     searchParams.get('venueId') ?? '',
    periodLabel: '',
    totalSales:  '',
    venueShare:  '',
    notes:       '',
  })

  useEffect(() => {
    getDocs(query(collection(db, 'venues'), orderBy('name'))).then(snap => {
      setVenues(snap.docs.map(d => ({ id: d.id, ...d.data() } as Venue)))
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) { setError('Please select a PDF file.'); return }
    if (!form.venueId) { setError('Please select a venue.'); return }
    setError(null)
    setSaving(true)

    try {
      const storagePath = `statements/${form.venueId}/${Date.now()}-${file.name}`
      const storageRef  = ref(storage, storagePath)
      const uploadTask  = uploadBytesResumable(storageRef, file)

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          snap => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
          reject,
          resolve,
        )
      })

      const pdfUrl = await getDownloadURL(uploadTask.snapshot.ref)

      await addDoc(collection(db, 'statements'), {
        venueId:     form.venueId,
        periodLabel: form.periodLabel,
        totalSales:  parseFloat(form.totalSales),
        venueShare:  parseFloat(form.venueShare),
        pdfPath:     storagePath,
        pdfUrl,
        notes:       form.notes,
        uploadedAt:  serverTimestamp(),
      })

      setSuccess(true)
      setFile(null)
      setProgress(0)
      setForm(f => ({ ...f, periodLabel: '', totalSales: '', venueShare: '', notes: '' }))
    } catch (err) {
      console.error(err)
      setError('Upload failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Upload Statement</h1>

      {success && (
        <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium px-4 py-3 rounded-xl mb-6">
          Statement uploaded successfully!{' '}
          <button onClick={() => setSuccess(false)} className="underline">Upload another</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card rounded-2xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Venue</label>
          <select
            required
            value={form.venueId}
            onChange={e => setForm(f => ({ ...f, venueId: e.target.value }))}
            className={INPUT}
          >
            <option value="">Select a venue…</option>
            {venues.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Period</label>
          <input
            required
            value={form.periodLabel}
            onChange={e => setForm(f => ({ ...f, periodLabel: e.target.value }))}
            placeholder="February 2026"
            className={INPUT}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Total Sales ($)</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.totalSales}
              onChange={e => setForm(f => ({ ...f, totalSales: e.target.value }))}
              placeholder="0.00"
              className={INPUT}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Venue Share ($)</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.venueShare}
              onChange={e => setForm(f => ({ ...f, venueShare: e.target.value }))}
              placeholder="0.00"
              className={INPUT}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">PDF Statement</label>
          <input
            required
            type="file"
            accept=".pdf"
            onChange={e => setFile(e.target.files?.[0] ?? null)}
            className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0
              file:text-sm file:font-semibold file:bg-brand-700 file:text-white hover:file:bg-brand-800 cursor-pointer"
          />
        </div>

        {saving && progress > 0 && (
          <div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-brand-700 rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{progress}% uploaded</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notes (optional)</label>
          <textarea
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            rows={2}
            className={INPUT}
          />
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-4 py-2.5 rounded-lg">{error}</p>}

        <button type="submit" disabled={saving} className="btn-primary w-full justify-center py-3 text-sm">
          {saving ? `Uploading… ${progress}%` : 'Upload Statement'}
        </button>
      </form>
    </div>
  )
}
