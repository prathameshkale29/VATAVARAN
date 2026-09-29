export type IMDSeverity = 'red' | 'orange' | 'yellow' | 'green'

export interface AgroAlert {
  id: string
  title: { en: string; mr: string }
  category: 'rainfall' | 'heat' | 'wind' | 'soil' | 'thunderstorm' | 'favorable'
  panchayatId: string
  panchayatName: { en: string; mr: string }
  blockId: string
  blockName: { en: string; mr: string }
  districtId: string
  districtName: { en: string; mr: string }
  severity: IMDSeverity
  headline: { en: string; mr: string }
  description: { en: string; mr: string }
  metricTrigger: {
    parameter: { en: string; mr: string }
    currentValue: string
    thresholdValue: string
    unit: string
    variance: string
  }
  forecastWindow: { en: string; mr: string }
  affectedCrops: {
    crop: string
    cropMr: string
    stage: { en: string; mr: string }
    impact: { en: string; mr: string }
  }[]
  actions: {
    dos: { en: string; mr: string }[]
    donts: { en: string; mr: string }[]
  }
  audioScript: { en: string; mr: string }
  issuedAt: string
  validUntil: string
  source: string
  coordinates: [number, number]
}

export const IMD_SEVERITY_CONFIG: Record<
  IMDSeverity,
  {
    labelEn: string
    labelMr: string
    actionEn: string
    actionMr: string
    badgeBg: string
    badgeText: string
    border: string
    cardBg: string
    bannerBg: string
    pulseColor: string
    iconBg: string
  }
> = {
  red: {
    labelEn: 'RED WARNING',
    labelMr: 'लाल इशारा (तात्काळ कृती)',
    actionEn: 'Take Immediate Action',
    actionMr: 'तात्काळ उपाययोजना करा',
    badgeBg: 'bg-rose-600',
    badgeText: 'text-white',
    border: 'border-rose-400',
    cardBg: 'bg-rose-50/40',
    bannerBg: 'bg-gradient-to-r from-rose-600 to-red-700 text-white',
    pulseColor: 'bg-rose-500',
    iconBg: 'bg-rose-100 text-rose-700',
  },
  orange: {
    labelEn: 'ORANGE ALERT',
    labelMr: 'केशरी इशारा (सतर्क राहा)',
    actionEn: 'Be Prepared',
    actionMr: 'पूर्ण सतर्क व तयार राहा',
    badgeBg: 'bg-amber-600',
    badgeText: 'text-white',
    border: 'border-amber-400',
    cardBg: 'bg-amber-50/40',
    bannerBg: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white',
    pulseColor: 'bg-amber-500',
    iconBg: 'bg-amber-100 text-amber-700',
  },
  yellow: {
    labelEn: 'YELLOW WATCH',
    labelMr: 'पिवळा इशारा (सावध राहा)',
    actionEn: 'Be Updated',
    actionMr: 'हवामान बदलावर लक्ष ठेवा',
    badgeBg: 'bg-yellow-500',
    badgeText: 'text-slate-950 font-bold',
    border: 'border-yellow-300',
    cardBg: 'bg-yellow-50/30',
    bannerBg: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950',
    pulseColor: 'bg-yellow-400',
    iconBg: 'bg-yellow-100 text-yellow-800',
  },
  green: {
    labelEn: 'GREEN (ALL CLEAR)',
    labelMr: 'हिरवा (अनुकूल हवामान)',
    actionEn: 'Normal Farm Operations',
    actionMr: 'नियमित शेतीकामे सुरू ठेवा',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    border: 'border-emerald-300',
    cardBg: 'bg-emerald-50/30',
    bannerBg: 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white',
    pulseColor: 'bg-emerald-500',
    iconBg: 'bg-emerald-100 text-emerald-700',
  },
}

export const AGRO_ALERTS_DATA: AgroAlert[] = [
  {
    id: 'alt-001',
    title: {
      en: 'Extreme Flash Downpour & Heavy Runoff Warning',
      mr: 'मुसळधार पाऊस व शेतात पाणी साचण्याची गंभीर पूर्वसूचना',
    },
    category: 'rainfall',
    panchayatId: 'dubera',
    panchayatName: { en: 'Dubera', mr: 'डुबेरा' },
    blockId: 'sinnar',
    blockName: { en: 'Sinnar', mr: 'सिन्नर' },
    districtId: 'nashik',
    districtName: { en: 'Nashik', mr: 'नाशिक' },
    severity: 'red',
    headline: {
      en: 'Sudden high-intensity convective rainfall > 52 mm/3h predicted in Sinnar foothills',
      mr: 'सिन्नर टेकड्यांच्या पट्ट्यात पुढील ३ तासांत ५२ मिमीपेक्षा जास्त मुसळधार पावसाची शक्यता',
    },
    description: {
      en: 'AI Downscaling model flags severe runoff convergence from higher elevation SRTM contours. Low-lying farm plots face imminent standing water.',
      mr: 'एसआरटीएम डिजिटल एलिव्हेशन मॉडेलनुसार सखल भागातील शेतात वेगाने पाणी साचण्याचा धोका आहे.',
    },
    metricTrigger: {
      parameter: { en: 'Rainfall Intensity', mr: 'पावसाची तीव्रता' },
      currentValue: '54.2 mm / 3h',
      thresholdValue: '35.0 mm',
      unit: 'mm',
      variance: '+55% above critical threshold',
    },
    forecastWindow: {
      en: 'Next 6 hours (High Risk Window: 16:00 - 22:00)',
      mr: 'पुढील ६ तास (अतिदक्षतेचा काळ: दुपारी ४ ते रात्री १०)',
    },
    affectedCrops: [
      {
        crop: 'Soybean',
        cropMr: 'सोयाबीन',
        stage: { en: 'Pod filling / Maturity', mr: 'शेंगा भरणे / पक्वता' },
        impact: {
          en: 'Severe risk of pod sprouting and fungal pod decay if water stands for > 6 hours.',
          mr: 'शेतात ६ तासांपेक्षा जास्त पाणी साचल्यास शेंगांना मोड फुटणे व बुरशीजन्य कुजण्याचा मोठा धोका.',
        },
      },
      {
        crop: 'Onion',
        cropMr: 'कांदा (खरिप / रांगडा)',
        stage: { en: 'Bulb formation / Nursery bed', mr: 'कांदा पोसणे / रोपवाटिका' },
        impact: {
          en: 'Nursery beds risk complete washing away. Mature bulbs can soften and rot rapidly.',
          mr: 'रोपवाटिका वाहून जाण्याची भीती. काढणीस आलेला कांदा सडण्याची शक्यता.',
        },
      },
    ],
    actions: {
      dos: [
        {
          en: 'Immediately open drainage trenches at the lower end of the farm bunds to drain excess water.',
          mr: 'बांधाचे खालचे भाग फोडून पाण्याचा तातडीने निचरा होण्यासाठी चर मोकळे करा.',
        },
        {
          en: 'Move harvested produce and harvested onion piles under tin/tarpaulin shed on elevated ground.',
          mr: 'काढणी केलेला शेतमाल किंवा कांदा तातडीने ताडपत्रीने झाकून उंच जागेवर ठेवा.',
        },
        {
          en: 'Inspect farm electric pump sets and disconnect power in case of nullah water ingress.',
          mr: 'ओढ्याकाठचे कृषीपंप सुरक्षित ठिकाणी हलवा किंवा वीजपुरवठा बंद ठेवा.',
        },
      ],
      donts: [
        {
          en: 'DO NOT spray any insecticides, fungicides, or foliar urea today — 100% will be washed away.',
          mr: 'आज कोणतीही औषध फवारणी किंवा खते देऊ नका — औषध वाहून जाऊन मोठे नुकसान होईल.',
        },
        {
          en: 'DO NOT run heavy tractors or cultivators on saturated black soil; it causes compaction.',
          mr: 'ओल्या काळ्या जमिनीत ट्रॅक्टर किंवा जड औजारे चालवू नका; माती घट्ट होईल.',
        },
      ],
    },
    audioScript: {
      en: 'Emergency Red Alert for Dubera Panchayat, Sinnar. Intense downpour expected exceeding 52 millimeters. Clear field drainage channels immediately to save soybean pods and onion nurseries.',
      mr: 'डुबेरा ग्रामपंचायतीसाठी लाल इशारा! पुढील काही तासांत ५२ मिलिमीटरपेक्षा जास्त मुसळधार पावसाचा अंदाज आहे. सोयाबीन व कांदा पिकात साचलेले पाणी वाहून जाण्यासाठी शेतातील चर त्वरित मोकळे करा.',
    },
    issuedAt: 'Today, 02:30 PM',
    validUntil: 'Today, 11:59 PM',
    source: 'VataVaran 1km AI Super-Resolution + IMD Nowcast',
    coordinates: [19.782, 73.964],
  },
  {
    id: 'alt-002',
    title: {
      en: 'Hailstorm & High Gust Convective Storm Threat',
      mr: 'गारपीट व वादळी वाऱ्यांचा अति-दक्षतेचा इशारा',
    },
    category: 'thunderstorm',
    panchayatId: 'panchale',
    panchayatName: { en: 'Panchale', mr: 'पांचाळे' },
    blockId: 'sinnar',
    blockName: { en: 'Sinnar', mr: 'सिन्नर' },
    districtId: 'nashik',
    districtName: { en: 'Nashik', mr: 'नाशिक' },
    severity: 'red',
    headline: {
      en: 'Radar convective cell approaching with potential for 15-20mm hail stones and 55 km/h gusts',
      mr: 'रडारवर जोरदार वादळी ढग सक्रीय असून १५-२० मिमी आकाराची गारपीट व ५५ किमी वेगाने वादळाची शक्यता',
    },
    description: {
      en: 'Severe updraft detected in satellite Doppler channel over Sinnar-Niphad boundary. High risk to orchards and shade nets.',
      mr: 'उपग्रह डॉप्लर चॅनेलवर वादळी ढगांची निर्मिती झाली असून द्राक्ष बागा व शेडनेटसाठी मोठा धोका आहे.',
    },
    metricTrigger: {
      parameter: { en: 'Wind Gust & Reflectivity', mr: 'वादळी वाऱ्याचा वेग' },
      currentValue: '58 km/h (48 dBZ)',
      thresholdValue: '40 km/h',
      unit: 'km/h',
      variance: '+45% above hail threshold',
    },
    forecastWindow: {
      en: 'Next 4 hours (Peak window: 17:00 - 20:30)',
      mr: 'पुढील ४ तास (सायंकाळी ५ ते रात्री ८:३०)',
    },
    affectedCrops: [
      {
        crop: 'Grapes',
        cropMr: 'द्राक्षे (Nashik Belt)',
        stage: { en: 'Shoot emergence / Pruning', mr: 'नवीन फूट / छाटणी' },
        impact: {
          en: 'Hail can cause severe bark bruising, shoot snap, and open wounds inviting bacterial blight.',
          mr: 'गारपिटीमुळे नवीन कोवळ्या फुटी तुटणे व खोडावर जखमा होऊन जिवाणूजन्य रोगाचा धोका.',
        },
      },
      {
        crop: 'Pomegranate',
        cropMr: 'डाळिंब',
        stage: { en: 'Flower & small fruit setting', mr: 'फुलधारणा व फळधारणा' },
        impact: {
          en: 'Heavy fruit drop and skin scarring rendering market produce unsellable.',
          mr: 'फळे गळणे व फळांवर डाग पडून बाजारभाव कोसळण्याची भीती.',
        },
      },
    ],
    actions: {
      dos: [
        {
          en: 'Secure and tie anti-hail nets or shade net coverings immediately over orchards and nurseries.',
          mr: 'द्राक्ष बागा व शेडनेटवरील अँटी-हेल नेट तातडीने घट्ट बांधून सुरक्षित करा.',
        },
        {
          en: 'Provide bamboo or wire prop supports to leaning banana, papaya, and young fruit saplings.',
          mr: 'केळी, पपई व लहान फळझाडांना बांबू किंवा तारेचा आधार द्या.',
        },
        {
          en: 'Post-hail event, spray Copper Oxychloride (2.5g/L) to disinfect physical leaf bruises.',
          mr: 'गारपीट थांबल्यानंतर जखमा भरण्यासाठी कॉपर ऑक्सिक्लोराईडची (२.५ ग्रॅम/लि.) फवारणी करा.',
        },
      ],
      donts: [
        {
          en: 'DO NOT stay under tall isolated trees or tin sheds during lightning strikes.',
          mr: 'विजांचा कडकडाट सुरू असताना शेतातील झाडाखाली किंवा उघड्या पत्र्याखाली थांबू नका.',
        },
        {
          en: 'DO NOT tether livestock near loose tin sheds, solar panels, or barbed metal wire fences.',
          mr: 'जनावरांना लोखंडी कुंपणाजवळ, पत्र्यांच्या शेडखाली किंवा सोलर पॅनेलजवळ बांधू नका.',
        },
      ],
    },
    audioScript: {
      en: 'Red Alert: Hailstorm and destructive winds warning for Panchale, Sinnar. Secure grape vineyard nets and keep livestock inside shelters.',
      mr: 'पांचाळे ग्रामपंचायतीसाठी लाल इशारा! गारपीट व ५५ किमी वेगाने वादळी वाऱ्यांची दाट शक्यता. द्राक्ष बागांची जाळी घट्ट करा व जनावरांना सुरक्षित गोठ्यात बांधा.',
    },
    issuedAt: 'Today, 03:00 PM',
    validUntil: 'Today, 09:00 PM',
    source: 'Bhuvan Satellite Radar + VataVaran AI Alert Engine',
    coordinates: [19.821, 73.992],
  },
  {
    id: 'alt-003',
    title: {
      en: 'Severe Heatwave & Soil Moisture Stress Alert',
      mr: 'तीव्र उष्णतेची लाट व जमिनीतील ओलावा कमतरतेचा इशारा',
    },
    category: 'heat',
    panchayatId: 'katol',
    panchayatName: { en: 'Katol', mr: 'काटोल' },
    blockId: 'katol',
    blockName: { en: 'Katol', mr: 'काटोल' },
    districtId: 'nagpur',
    districtName: { en: 'Nagpur', mr: 'नागपूर' },
    severity: 'orange',
    headline: {
      en: 'Afternoon canopy temperature touching 38.6°C with dry westerly winds across Katol orange belt',
      mr: 'काटोल संत्रा पट्ट्यात दुपारचे तापमान ३८.६° से. पर्यंत जाऊन कोरडे उष्ण वारे वाहण्याची शक्यता',
    },
    description: {
      en: 'Rapid vapor pressure deficit (VPD) spike causes excessive leaf transpiration and premature fruit drop in Nagpur mandarin orchards.',
      mr: 'हवेतील तीव्र कोरडेपणामुळे झाडांचे बाष्पीभवन वाढून संत्री बागांमध्ये अंबिया बहराची फळगळ वाढण्याची भीती.',
    },
    metricTrigger: {
      parameter: { en: 'Peak Temperature', mr: 'कमाल तापमान' },
      currentValue: '38.6 °C (VPD: 3.2 kPa)',
      thresholdValue: '35.5 °C',
      unit: '°C',
      variance: '+3.1°C above heatwave baseline',
    },
    forecastWindow: {
      en: 'Valid for next 48 hours (Peak heat: 11:30 - 16:30)',
      mr: 'पुढील ४८ तास (उष्णतेचा मुख्य काळ: सकाळी ११:३० ते दुपारी ४:३०)',
    },
    affectedCrops: [
      {
        crop: 'Nagpur Mandarin / Orange',
        cropMr: 'संत्री (नागपूर संत्रा)',
        stage: { en: 'Fruit development', mr: 'फळ वाढीचा टप्पा' },
        impact: {
          en: 'Thermal shock triggers abscission layer formation causing marble-sized orange fruit drop.',
          mr: 'उष्णतेच्या धक्क्याने फळांच्या देठाजवळ थर तयार होऊन गोळी आकाराची संत्री गळतात.',
        },
      },
      {
        crop: 'Cotton',
        cropMr: 'कापूस',
        stage: { en: 'Flowering & square formation', mr: 'पात्या व फुले भरणे' },
        impact: {
          en: 'Flower abortion and desiccated squares under hot afternoon winds.',
          mr: 'उष्ण वाऱ्यांमुळे पात्या वाळणे व फुले गळून उत्पादनात घट होणे.',
        },
      },
    ],
    actions: {
      dos: [
        {
          en: 'Run micro-drip or sprinkler irrigation only in the evening (after 6 PM) or early morning.',
          mr: 'ठिबक किंवा तुषार सिंचन केवळ संध्याकाळी ६ नंतर किंवा सकाळी लवकर चालू करा.',
        },
        {
          en: 'Apply straw or dry biomass mulching around fruit tree basins to conserve root zone moisture.',
          mr: 'फळझाडांच्या आळ्यात वाळलेले गवत किंवा उसाचे पाचट पसरवून ओलावा टिकवून ठेवा.',
        },
        {
          en: 'Foliar spray of Potassium Nitrate (13-0-45 at 5g/L) to build heat stress tolerance in citrus.',
          mr: 'संत्र्यांमध्ये उष्णतेचा ताण कमी करण्यासाठी पोटॅशियम नायट्रेट (१३-०-४५) ५ ग्रॅम/लि. फवारा.',
        },
      ],
      donts: [
        {
          en: 'NEVER flood-irrigate orchards during peak noon hours (12 PM - 3 PM); causes root asphyxiation.',
          mr: 'दुपारी १२ ते ३ या कडक उन्हाच्या वेळेत पाणी देऊ नका; मुळांना उकळा बसून झाडे सुकतात.',
        },
        {
          en: 'Avoid heavy nitrogen or chemical weedicide sprays during heat spells.',
          mr: 'तीव्र उन्हात युरिया खतांचा जास्त वापर किंवा तणनाशक फवारणी टाळा.',
        },
      ],
    },
    audioScript: {
      en: 'Orange Alert: Severe heatwave approaching Katol. Temperatures reaching 38.6 degrees Celsius. Irrigate orange orchards during evening hours and apply basin mulching.',
      mr: 'काटोल तालुक्यासाठी केशरी इशारा! तापमान ३८.६ अंशांपर्यंत वाढणार आहे. संत्रा बागांना दुपारऐवजी संध्याकाळी पाणी द्या आणि झाडांच्या आळ्यात पालापाचोळ्याचे आच्छादन करा.',
    },
    issuedAt: 'Today, 11:00 AM',
    validUntil: 'Tomorrow, 06:00 PM',
    source: 'VataVaran Micro-Climate Engine + Open-Meteo Synoptic Model',
    coordinates: [21.283, 78.583],
  },
  {
    id: 'alt-004',
    title: {
      en: 'Topsoil Waterlogging & Root Hypoxia Advisory',
      mr: 'जमिनीतील अतिरिक्त ओलावा व मुळे कुजण्याचा इशारा',
    },
    category: 'soil',
    panchayatId: 'sevagram',
    panchayatName: { en: 'Sevagram', mr: 'सेवाग्राम' },
    blockId: 'wardha',
    blockName: { en: 'Wardha', mr: 'वर्धा' },
    districtId: 'wardha',
    districtName: { en: 'Wardha', mr: 'वर्धा' },
    severity: 'orange',
    headline: {
      en: 'Topsoil saturation exceeds 88% in deep black cotton soils (Vertisols) of Wardha valley',
      mr: 'वर्धा खोऱ्यातील भारी काळ्या जमिनीत वरच्या थरातील ओलावा ८८% पेक्षा जास्त पोहोचला आहे',
    },
    description: {
      en: 'Continuous wet weather without drainage causes lack of oxygen (hypoxia) in crop root zones, leading to sudden yellowing of soybean foliage.',
      mr: 'पाण्याचा निचरा न झाल्याने मुळांना ऑक्सिजन न मिळून सोयाबीनची पाने पिवळी पडण्याचा धोका निर्माण झाला आहे.',
    },
    metricTrigger: {
      parameter: { en: 'Topsoil Moisture Saturation', mr: 'मातीतील ओलावा संपृक्तता' },
      currentValue: '91.4% (Field Cap. Exceeded)',
      thresholdValue: '75.0%',
      unit: '%',
      variance: '+21% over field saturation capacity',
    },
    forecastWindow: {
      en: 'Next 36 hours (Intermittent drizzle continuing)',
      mr: 'पुढील ३६ तास (हलकी रिमझिम सुरू राहण्याची शक्यता)',
    },
    affectedCrops: [
      {
        crop: 'Soybean',
        cropMr: 'सोयाबीन',
        stage: { en: 'Vegetative to podding', mr: 'वाढ ते शेंगा भरणे' },
        impact: {
          en: 'Leaf chlorosis (yellowing) and root rot (Rhizoctonia/Fusarium) spread rapidly.',
          mr: 'पाने पिवळी पडणे आणि मुळकुजव्या रोगाचा प्रादुर्भाव वेगाने वाढणे.',
        },
      },
      {
        crop: 'Cotton',
        cropMr: 'कापूस',
        stage: { en: 'Branching / Flowering', mr: 'फांद्या फुटणे व फुलकळी' },
        impact: {
          en: 'Square drop and stunted growth due to lack of soil aeration.',
          mr: 'हवा खेळती न राहिल्याने पात्या गळणे व वाढ खुंटणे.',
        },
      },
    ],
    actions: {
      dos: [
        {
          en: 'Dig lateral drainage trenches every 15-20 rows (Broad Bed Furrow method) to evacuate standing water.',
          mr: 'शेतात दर १५-२० ओळींनंतर आडवे चर काढून पाण्याचा तातडीने निचरा करा.',
        },
        {
          en: 'Once top layer is workable, spray 19:19:19 (5g/L) + Micronutrients to revive yellowing leaves.',
          mr: 'वाफसा आल्यावर पिवळेपणा घालवण्यासाठी १९:१९:१९ (५ ग्रॅम/लि.) खताची फवारणी करा.',
        },
      ],
      donts: [
        {
          en: 'DO NOT add solid urea fertilizer to waterlogged fields; it leaches into groundwater.',
          mr: 'पाणी साचलेल्या शेतात युरिया खताची गोण फेकू नका; खत वाहून वाया जाईल.',
        },
        {
          en: 'DO NOT walk heavily across saturated beds causing soil compaction.',
          mr: 'ओल्या शेतातून वारंवार ये-जा करून माती घट्ट करू नका.',
        },
      ],
    },
    audioScript: {
      en: 'Orange Alert for Sevagram, Wardha. Soil moisture is critically saturated. Dig drainage furrows immediately to save soybean crops from root rot.',
      mr: 'सेवाग्राम ग्रामपंचायतीसाठी केशरी इशारा! काळ्या जमिनीत पाणी साचले असून मुळकुजव्या रोगाचा धोका आहे. शेतात तातडीने चर काढून पाणी बाहेर काढा.',
    },
    issuedAt: 'Today, 01:15 PM',
    validUntil: 'Tomorrow, 08:00 PM',
    source: 'SMAP Soil Satellite + VataVaran Agro Engine',
    coordinates: [20.718, 78.618],
  },
  {
    id: 'alt-005',
    title: {
      en: 'High Humidity & Fungal Spore Spread Watch',
      mr: 'हवेतील उच्च आर्द्रता व बुरशीजन्य रोगाचा सावधगिरीचा इशारा',
    },
    category: 'favorable',
    panchayatId: 'seloo',
    panchayatName: { en: 'Seloo', mr: 'सेलू' },
    blockId: 'seloo',
    blockName: { en: 'Seloo', mr: 'सेलू' },
    districtId: 'wardha',
    districtName: { en: 'Wardha', mr: 'वर्धा' },
    severity: 'yellow',
    headline: {
      en: 'Relative humidity persisting above 86% with overcast skies favorable for Downey Mildew and Rust',
      mr: 'हवेतील दमटपणा ८६% पेक्षा जास्त राहिल्याने सोयाबीनवरील तांबेरा व भाजीपाल्यावरील करपा रोगास पोषक वातावरण',
    },
    description: {
      en: 'Micro-climate monitoring detects prolonged leaf wetness duration (> 8 hours continuous). Preventive organic or bio-fungicide protective measures advised.',
      mr: 'पानांवर पाण्याचे थेंब जास्त वेळ साचून राहत असल्याने प्रतिबंधात्मक जैविक बुरशीनाशक वापरण्याचा सल्ला.',
    },
    metricTrigger: {
      parameter: { en: 'Relative Humidity', mr: 'हवेतील आर्द्रता' },
      currentValue: '88% (Leaf Wetness: 9.2 hrs)',
      thresholdValue: '75%',
      unit: '%',
      variance: '+13% continuous moist span',
    },
    forecastWindow: {
      en: 'Next 24 hours (Cloudy & humid conditions)',
      mr: 'पुढील २४ तास (ढगाळ व दमट वातावरण)',
    },
    affectedCrops: [
      {
        crop: 'Soybean',
        cropMr: 'सोयाबीन',
        stage: { en: 'Pod formation', mr: 'शेंगा भरणे' },
        impact: {
          en: 'Soybean rust (Phakopsora pachyrhizi) risk on lower canopy leaves.',
          mr: 'खालच्या पानांवर तांबेरा रोगाचे लालसर ठिपके पडण्याचा धोका.',
        },
      },
      {
        crop: 'Vegetables / Chilli',
        cropMr: 'भाजीपाला / मिरची',
        stage: { en: 'Flowering / Fruiting', mr: 'फुलोरा व फळे' },
        impact: {
          en: 'Anthracnose fruit rot and powdery mildew.',
          mr: 'फळ कुज आणि भुरी रोगाचा प्रादुर्भाव वाढण्याची शक्यता.',
        },
      },
    ],
    actions: {
      dos: [
        {
          en: 'Apply preventive spray of Trichoderma viride (5g/L) or Carbendazim+Mancozeb on cloudy morning.',
          mr: 'सकाळी प्रतिबंधात्मक म्हणून ट्रायकोडर्मा विरिडी (५ ग्रॅम) किंवा साफ बुरशीनाशकाची फवारणी करा.',
        },
        {
          en: 'Ensure proper airflow between plant rows by removing lower infested yellow leaves.',
          mr: 'हवा खेळती राहण्यासाठी पिकाच्या खालची पिवळी व सुकलेली पाने काढून टाका.',
        },
      ],
      donts: [
        {
          en: 'DO NOT irrigate already moist fields while humidity remains near 90%.',
          mr: 'हवा आधीच दमट असताना शेताला अतिरिक्त पाणी देऊ नका.',
        },
        {
          en: 'DO NOT spray in rain without adding a certified silicon spreading sticker.',
          mr: 'स्टिकर (स्प्रेडर) न मिसळता औषध फवारणी करू नका.',
        },
      ],
    },
    audioScript: {
      en: 'Yellow Watch for Seloo. High humidity may induce fungal rust on soybean crops. Carry out preventive fungicide spraying during rain break.',
      mr: 'सेलू तालुक्यासाठी पिवळा सावधगिरीचा इशारा! हवेतील दमटपणामुळे तांबेरा रोगाचा धोका संभवतो. पाऊस उघडल्यावर प्रतिबंधात्मक फवारणी करा.',
    },
    issuedAt: 'Today, 08:30 AM',
    validUntil: 'Tomorrow, 08:00 AM',
    source: 'VataVaran Telemetry & Plant Pathology Advisory',
    coordinates: [20.835, 78.712],
  },
  {
    id: 'alt-006',
    title: {
      en: 'Optimal Clear Weather & Favorable Farming Window',
      mr: 'अनुकूल हवामान · शेतीकामे व फवारणीसाठी उत्तम संधी',
    },
    category: 'favorable',
    panchayatId: 'deoli',
    panchayatName: { en: 'Deoli', mr: 'देवळी' },
    blockId: 'deoli',
    blockName: { en: 'Deoli', mr: 'देवळी' },
    districtId: 'wardha',
    districtName: { en: 'Wardha', mr: 'वर्धा' },
    severity: 'green',
    headline: {
      en: 'Mild temperatures (28.4°C), gentle breeze, and zero precipitation forecast for next 72 hours',
      mr: 'पुढील ३ दिवस तापमान २८.४° से., मंद वारे आणि पाऊस नसल्याने शेतीकामांसाठी अत्यंत उत्तम दिवस',
    },
    description: {
      en: 'High atmospheric stability allows ideal conditions for pesticide spray absorption, inter-cultivation, and harvesting without weather disruption.',
      mr: 'हवामान पूर्ण स्थिर असल्याने कोळपणी, खुरपणी, खत व्यवस्थापन व कीटकनाशक फवारणीसाठी अनुकूल काळ.',
    },
    metricTrigger: {
      parameter: { en: 'Weather Stability Score', mr: 'हवामान अनुकूलता निर्देशांक' },
      currentValue: '96/100 (Safe Operations)',
      thresholdValue: '80/100',
      unit: 'pts',
      variance: 'Ideal conditions across all parameters',
    },
    forecastWindow: {
      en: 'Next 3 Days (Safe farming window: 28 Sep - 01 Oct)',
      mr: 'पुढील ३ दिवस (सुरक्षित शेतीचा कालावधी: २८ सप्टें ते ०१ ऑक्टो)',
    },
    affectedCrops: [
      {
        crop: 'Cotton & Soybean',
        cropMr: 'कापूस व सोयाबीन',
        stage: { en: 'Active vegetative to maturity', mr: 'सक्रिय वाढ ते पक्वता' },
        impact: {
          en: 'Perfect weather for nutrient uptake and completing pending farm activities.',
          mr: 'खते लागू होण्यासाठी आणि खोळंबलेली कामे पूर्ण करण्यासाठी सुवर्णसंधी.',
        },
      },
    ],
    actions: {
      dos: [
        {
          en: 'Complete scheduled pesticide and tonic sprays; 100% absorption expected without wash-off.',
          mr: 'नियोजित कीटकनाशक व टॉनिकची फवारणी पूर्ण करून घ्या; औषध पूर्ण लागू पडेल.',
        },
        {
          en: 'Carry out inter-cultivation (kolapani) and manual weeding while soil is in perfect workable condition.',
          mr: 'वाफसा असताना शेतातील तण काढून आंतरमशागत आणि कोळपणीची कामे वेगाने उरकून घ्या.',
        },
      ],
      donts: [
        {
          en: 'DO NOT leave harvested crops uncovered overnight due to early morning heavy dew.',
          mr: 'पहाटे पडणाऱ्या दाट दवबिंदूंमुळे काढणी केलेले धान्य उघड्यावर ठेवू नका.',
        },
      ],
    },
    audioScript: {
      en: 'Green Alert for Deoli. Excellent clear weather predicted for 3 days. Complete spraying and weeding operations safely.',
      mr: 'देवळी परिसरासाठी हिरवा इशारा! पुढील ३ दिवस हवामान पूर्णपणे अनुकूल राहील. फवारणी व आंतरमशागतीची कामे उरकून घ्या.',
    },
    issuedAt: 'Today, 07:00 AM',
    validUntil: '01 Oct, 06:00 PM',
    source: 'VataVaran High-Resolution Synoptic Forecast',
    coordinates: [20.655, 78.483],
  },
]

export const EMERGENCY_HELPLINES = [
  {
    nameEn: 'Kisan Call Center (Ministry of Agriculture)',
    nameMr: 'किसान कॉल सेंटर (कृषी मंत्रालय)',
    number: '1800-180-1551',
    typeEn: 'Toll-Free Agricultural Advice',
    typeMr: 'मोफत कृषी सल्ला',
    timingEn: '6:00 AM - 10:00 PM (All 7 Days)',
    timingMr: 'सकाळी ६ ते रात्री १० (सर्व दिवस)',
    icon: 'PhoneCall',
  },
  {
    nameEn: 'State Disaster Management Authority (SDMA)',
    nameMr: 'राज्य आपत्ती व्यवस्थापन प्राधिकरण',
    number: '1070',
    typeEn: 'Extreme Flood & Cyclone Emergency',
    typeMr: 'पूर व चक्रीवादळ आपत्कालीन मदत',
    timingEn: '24x7 Emergency Line',
    timingMr: '२४ तास अविरत सेवा',
    icon: 'ShieldAlert',
  },
  {
    nameEn: 'Krishi Vigyan Kendra (KVK) Agronomist Desk',
    nameMr: 'कृषी विज्ञान केंद्र (केव्हीके) कृषी तज्ज्ञ',
    number: '0253-2571234',
    typeEn: 'Crop Disease & Damage Verification',
    typeMr: 'पीक नुकसान व रोग नियंत्रण मार्गदर्शन',
    timingEn: '9:30 AM - 6:00 PM (Govt Working Days)',
    timingMr: 'सकाळी ९:३० ते सायंकाळी ६ (कामाचे दिवस)',
    icon: 'Sprout',
  },
  {
    nameEn: 'National Emergency Response System',
    nameMr: 'राष्ट्रीय आपत्कालीन प्रतिसाद प्रणाली',
    number: '112',
    typeEn: 'Police, Fire, Medical & Rescue',
    typeMr: 'पोलीस, रुग्णवाहिका व बचावकार्य',
    timingEn: '24x7 Pan-India Hotline',
    timingMr: '२४ तास तात्काळ मदत',
    icon: 'Radio',
  },
]
