import { createFileRoute } from '@tanstack/react-router'
import { PageHeader, meta } from '@/components/grammausam/common'
import { CropAdvisoryWizard } from '@/components/grammausam/crop-advisory-wizard'
import { useLanguage } from '@/lib/i18n'
import { z } from 'zod'

const searchSchema = z.object({
  panchayat: z.string().optional(),
})

export const Route = createFileRoute('/crop-advisory')({
  validateSearch: (search) => searchSchema.parse(search),
  head: () =>
    meta(
      'Farmer Crop Advisory · शेतकरी पीक सल्ला',
      'Action-oriented agricultural crop advisories downscaled for individual Gram Panchayats with voice narration.'
    ),
  component: CropAdvisoryPage,
})

function CropAdvisoryPage() {
  const { language } = useLanguage()
  const { panchayat } = Route.useSearch()

  return (
    <>
      <PageHeader
        eyebrow={language === 'mr' ? 'शेतकरी पीक सल्ला' : language === 'hi' ? 'किसान फसल सलाह' : 'Crop Advisory'}
        title={
          language === 'mr'
            ? 'ग्रामपंचायत-स्तरीय शेती व पीक सल्ला'
            : language === 'hi'
              ? 'ग्राम पंचायत स्तरीय फसल सलाह'
              : 'Panchayat-Level Crop Advisory'
        }
        description={
          language === 'mr'
            ? 'हवामान अंदाज, पिकाचा प्रकार आणि वाढीच्या अवस्थेनुसार थेट शेतीकामासाठी उपयुक्त कृती-आधारित मार्गदर्शन.'
            : language === 'hi'
              ? 'मौसम पूर्वानुमान, फसल और विकास अवस्था के अनुसार खेत कार्यों के लिए व्यावहारिक मार्गदर्शन।'
              : 'Actionable agricultural guidance tailored to real-time micro-climate, crop type, and crop growth stage.'
        }
      />
      <div className="page-shell py-8">
        <CropAdvisoryWizard initialPanchayatId={panchayat} />
      </div>
    </>
  )
}
