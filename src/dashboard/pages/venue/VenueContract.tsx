import { useVenueData } from '../../hooks/useVenueData'

export default function VenueContract() {
  const { venue, loading } = useVenueData()

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Contract</h1>

      <div className="card rounded-2xl p-8">
        {venue?.contractUrl ? (
          <div className="flex flex-col items-start gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">Your signed agreement with Nick's Vending is on file. Click below to view your contract.</p>
            <a
              href={venue.contractUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2.5 px-6"
            >
              View Contract
            </a>
          </div>
        ) : (
          <p className="text-sm text-slate-400">No contract on file yet. Contact Nick's Vending if you have any questions.</p>
        )}
      </div>
    </div>
  )
}
