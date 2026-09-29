import { createFileRoute } from '@tanstack/react-router'
import { meta } from '@/components/grammausam/common'
import { AlertsView } from '@/components/grammausam/alerts-view'

export const Route = createFileRoute('/alerts')({
  head: () =>
    meta(
      'Agro-Climate Alerts & Early Warnings · VataVaran',
      'IMD 4-tier weather alerts, localized crop impact guidance, emergency voice audio readouts, and WhatsApp broadcasts downscaled for Maharashtra Gram Panchayats.'
    ),
  component: AlertsPage,
})

function AlertsPage() {
  return <AlertsView />
}
