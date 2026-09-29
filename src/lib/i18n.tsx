import React, { createContext, useContext, useEffect, useState } from 'react'

export type Language = 'mr' | 'hi' | 'en'

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string, fallback?: string) => string
  getPlaceName: (name: string) => string
  getConditionName: (condition: string) => string
  getAdvisoryText: (advisory: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  mr: {
    // Brand & Taglines
    'brand.name': 'वातावरण (VataVaran)',
    'brand.subtitle': 'ग्रामपंचायत पातळीवरील हवामान बुद्धिमत्ता · प्रात्यक्षिक व्यासपीठ',
    'brand.logoBadge': 'स्थानिक हवामान व पीक सल्ला स्टुडिओ',

    // Navigation Links
    'nav.home': 'मुख्यपृष्ठ',
    'nav.weatherMap': 'हवामान नकाशा',
    'nav.cropAdvisory': '🌾 पीक सल्ला',
    'nav.forecast': 'हवामान अंदाज',
    'nav.aiDownscaling': 'एआय तंत्रज्ञान',
    'nav.historical': 'ऐतिहासिक विश्लेषण',
    'nav.methodology': 'कार्यपद्धती',
    'nav.alerts': 'हवामान इशारे',
    'nav.dashboard': 'मॉडेल डॅशबोर्ड',
    'nav.exploreMap': 'नकाशा पाहा',

    // Hero Section
    'hero.badge': 'स्मार्ट इंडिया हॅकाथॉन (SIH) · प्रात्यक्षिक प्रणाली',
    'hero.eyebrow': 'कृत्रिम बुद्धिमत्ता + जीआयएस हवामान माहिती',
    'hero.titlePrefix': 'तालुका पातळीवरून थेट ',
    'hero.titleHighlight': 'ग्रामपंचायत पातळीवर',
    'hero.titleSuffix': ' अचूक हवामान व पीक सल्ला',
    'hero.description':
      'हवामान, उपग्रह, भौगोलिक नकाशे, मातीचा प्रकार आणि पिकाच्या वाढ अवस्थेनुसार शेतकऱ्यांना थेट बांधावर उपयुक्त सल्ला.',
    'hero.exploreMapBtn': 'हवामान नकाशा उघडा',
    'hero.cropAdvisoryBtn': '🌾 पीक सल्ला मिळवा',
    'hero.howAiWorksBtn': 'एआय कसे कार्य करते',
    'hero.downscalingPreview': 'डाउनस्केलिंग पूर्वदृश्य',
    'hero.illustrativeValues': 'नमुना आकडेवारी',
    'hero.blockForecast': 'तालुका अंदाज',
    'hero.aiDownscalingLabel': 'एआय डाउनस्केलिंग',
    'hero.elevation': 'जमिनीची उंची',
    'hero.vegetation': 'वनस्पती आच्छादन',
    'hero.landUse': 'जमीन वापर',
    'hero.panchayatForecast': 'ग्रामपंचायत अंदाज',
    'hero.pipelineHeading': 'हवामान ते शेतकरी सल्ला प्रक्रिया',
    'hero.pipelineDesc':
      'राष्ट्रीय पातळीवरील मॉडेल्सपासून ते शेतकऱ्यांच्या बांधापर्यंत अचूक हवामान व शेती निर्णय पोहोचवण्याची व्यवस्था.',

    // Features
    'feat.highResTitle': 'अति-अचूक स्थानिक अंदाज',
    'feat.highResDesc': 'मोठ्या क्षेत्राचा अंदाज प्रत्येक ग्रामपंचायतीसाठी १ किमी सूक्ष्म पातळीवर रूपांतरित केला जातो.',
    'feat.aiTitle': 'एआय-आधारित डाउनस्केलिंग',
    'feat.aiDesc': 'स्थानिक डोंगरदऱ्या, झाडी आणि जमिनीनुसार तापमान व पावसाचा अंदाज सुधारला जातो.',
    'feat.multiSourceTitle': 'विविध स्त्रोतांची माहिती',
    'feat.multiSourceDesc': 'उपग्रह, वेधशाळा, माती आणि भौगोलिक माहितीचा एकत्रित अभ्यास.',
    'feat.localizedTitle': 'शेतकऱ्यांसाठी पीक सल्ला',
    'feat.localizedDesc': 'प्रत्येक ग्रामपंचायतीसाठी सिंचन, फवारणी, काढणी व कीड व्यवस्थापनाचा थेट कृती सल्ला.',

    // Home Weather Section
    'weather.grassrootsEyebrow': 'स्थानिक हवामान बुद्धिमत्ता',
    'weather.liveDownscaled': 'थेट एआय विश्लेषित',
    'weather.dashboardTitle': 'ग्रामपंचायत हवामान डॅशबोर्ड',
    'weather.dashboardDesc':
      'भौगोलिक रचना, उपग्रह आणि उंचीच्या आधारे तालुक्याच्या अंदाजावरून तयार केलेला प्रत्येक ग्रामपंचायतीचा अचूक अंदाज.',
    'weather.selectLocationTitle': 'जिल्हा निवडा → तालुका निवडा → ग्रामपंचायत निवडा',
    'weather.selectLocationDesc':
      'आपल्या भागातील स्थानिक हवामानाची सविस्तर माहिती पाहण्यासाठी स्थान निवडा',
    'weather.district': 'जिल्हा',
    'weather.block': 'तालुका',
    'weather.panchayat': 'ग्रामपंचायत',
    'weather.currentLocation': 'निवडलेले स्थान:',
    'weather.forecastDate': 'अंदाज तारीख:',
    'weather.center': 'अक्षांश/रेखांश:',
    'weather.blockAvg': 'तालुका सरासरीपेक्षा',
    'weather.sinnarAvg': 'सिन्नर सरासरीपेक्षा',

    // Weather Metrics
    'metric.rainfall': 'पाऊस (पर्जन्यमान)',
    'metric.precipitation': 'पावसाची स्थिती',
    'metric.temperature': 'तापमान',
    'metric.thermalCondition': 'उष्णतामान',
    'metric.humidity': 'हवेतील आर्द्रता (ओलावा)',
    'metric.relativeMoisture': 'सापेक्ष आर्द्रता',
    'metric.windSpeed': 'वाऱ्याचा वेग',
    'metric.airCirculation': 'वाऱ्याचा प्रवाह',
    'metric.feelsLike': 'जाणवणारे तापमान',
    'metric.dewPoint': 'दवबिंदू',
    'metric.probability': 'पावसाची शक्यता',
    'metric.advisory': 'शेतीविषयक सल्ला:',

    // AI Insight Banner
    'ai.calibrationTitle': 'एआय अचूकता तपासणी:',
    'ai.calibrationText':
      'एसआरटीएम उंची नकाशा, एनडीव्हीआय वनस्पती निर्देशांक आणि स्थानिक डोंगररांगांच्या आधारे एआय मॉडेल्स स्थानिक हवामान अचूक बनवतात.',
    'ai.detailedForecast': 'सविस्तर ७ दिवसांचा अंदाज',
    'ai.openGisMap': 'जीआयएस नकाशावर पाहा',

    // Weather Map Page
    'map.searchPlaceholder': 'ग्रामपंचायत, तालुका किंवा शहर शोधा...',
    'map.panchayatLevel': 'ग्रामपंचायत पातळी (१ किमी)',
    'map.blockLevel': 'तालुका पातळी',
    'map.bothLevels': 'दोन्ही पातळी',
    'map.downscaled1km': '१ किमी एआय अति-सूक्ष्म अंदाज',
    'map.coarse25km': '२५ किमी जागतिक अंदाज',
    'map.compare': 'तुलना (२५ किमी विरुद्ध १ किमी)',
    'map.runDownscaler': 'एआय डाउनस्केलर चालवा',
    'map.liveApiData': 'थेट हवामान माहिती (IMD/GFS)',
    'map.legend': 'रंग निर्देशांक',
    'map.forecastHours': 'वेळेनुसार अंदाज',
    'map.quickLayers': 'हवामान स्तर',
    'map.rainLayer': 'पावसाचा स्तर',
    'map.tempLayer': 'तापमान स्तर',
    'map.windLayer': 'वाऱ्याचा वेग',
    'map.humidityLayer': 'आर्द्रता स्तर',
    'map.satelliteLayer': 'उपग्रह ढग',
    'map.soilLayer': 'मातीतील ओलावा',
    'map.viewAdvisory': 'कृषी सल्ला पाहा →',
    'map.highRisk': '🔴 अति हवामान धोका',
    'map.advisoryAvailable': '🟡 शेती सल्ला उपलब्ध',
    'map.normalWeather': '🟢 हवामान सर्वसाधारण',

    // Crop Advisory Keys
    'crop.selectCropTitle': '🌾 आपले पीक निवडा',
    'crop.selectCropSubtitle': 'हवामानावर आधारित अचूक सल्ल्यासाठी आपले मुख्य पीक निवडा',
    'crop.stageTitle': '🌱 पिकाची वाढ अवस्था कोणती?',
    'crop.stageSubtitle': 'योग्य कृषी सल्ला तयार करण्यासाठी सध्याची अवस्था निवडा',
    'crop.locationTitle': '📍 निवडलेले स्थान (Panchayat)',
    'crop.changeLocation': 'स्थान बदला',
    'crop.changeCropStage': 'पीक किंवा अवस्था बदला',
    'crop.saveAsMyFarm': 'माझे शेत म्हणून जतन करा',
    'crop.farmSaved': 'शेत जतन झाले!',
    'crop.welcomeBack': 'पुन्हा स्वागत आहे 👋',
    'crop.todayAdvisory': 'आजचा कृषी सल्ला',
    'crop.listen': '🔊 ऐका / Listen',
    'crop.stopListening': 'थांबवा',
    'crop.speaking': 'वाचत आहे...',
    'crop.whyThisAdvisory': '🤖 हा सल्ला का दिला आहे? (कार्यप्रवाह)',
    'crop.forecastConfidence': 'अंदाज विश्वासार्हता:',
    'crop.confidenceHigh': '🟢 उच्च विश्वासार्हता (High)',
    'crop.confidenceMedium': '🟡 मध्यम (Medium)',
    'crop.confidenceLow': '🔴 कमी (Low)',
    'crop.forecastDetails': '📊 हवामान माहिती व डेटा स्त्रोत तपशील',
    'crop.actionOrientedHeadline': '👨‍🌾 आजचा शेती सल्ला (कृती-आधारित शिफारशी)',
    'crop.weatherOverview': 'स्थानिक हवामान स्थिती',

    // General
    'common.language': 'भाषा',
    'common.langEnglish': 'English',
    'common.langMarathi': 'मराठी',
    'common.langHindi': 'हिंदी',
    'common.demoBadge': 'डेमो माहिती',
    'common.loading': 'माहिती लोड होत आहे...',
    'common.goHome': 'मुख्यपृष्ठावर जा',
    'common.tryAgain': 'पुन्हा प्रयत्न करा',
    'common.uncertainty': 'अनिश्चितता: मॉडेल कॅलिब्रेशननंतर उपलब्ध होईल',
    'common.viewMap': 'नकाशावर पाहा',
    'common.methodologyFooter': 'कार्यपद्धती',
    'common.modelDashboardFooter': 'मॉडेल डॅशबोर्ड',
  },
  hi: {
    // Brand & Taglines
    'brand.name': 'वातावरण (VataVaran)',
    'brand.subtitle': 'ग्राम पंचायत स्तरीय मौसम बुद्धिमत्ता · प्रदर्शन मंच',
    'brand.logoBadge': 'स्थानिक मौसम एवं फसल सलाह स्टूडियो',

    // Navigation Links
    'nav.home': 'मुख्य पृष्ठ',
    'nav.weatherMap': 'मौसम नक्शा',
    'nav.cropAdvisory': '🌾 फसल सलाह',
    'nav.forecast': 'मौसम पूर्वानुमान',
    'nav.aiDownscaling': 'एआई तकनीक',
    'nav.historical': 'ऐतिहासिक विश्लेषण',
    'nav.methodology': 'कार्यप्रणाली',
    'nav.alerts': 'मौसम चेतावनी',
    'nav.dashboard': 'मॉडल डैशबोर्ड',
    'nav.exploreMap': 'नक्शा देखें',

    // Hero Section
    'hero.badge': 'स्मार्ट इंडिया हैकाथॉन (SIH) · प्रदर्शन प्रणाली',
    'hero.eyebrow': 'कृत्रिम बुद्धिमत्ता + जीआईएस मौसम जानकारी',
    'hero.titlePrefix': 'ब्लॉक स्तर से सीधे ',
    'hero.titleHighlight': 'ग्राम पंचायत स्तर पर',
    'hero.titleSuffix': ' सटीक मौसम एवं फसल सलाह',
    'hero.description':
      'मौसम, उपग्रह, भौगोलिक नक्शे, मिट्टी और फसल अवस्था के आधार पर किसानों के लिए सीधी उपयोगी सलाह।',
    'hero.exploreMapBtn': 'मौसम नक्शा खोलें',
    'hero.cropAdvisoryBtn': '🌾 फसल सलाह प्राप्त करें',
    'hero.howAiWorksBtn': 'एआई कैसे कार्य करता है',
    'hero.downscalingPreview': 'डाउनस्केलिंग पूर्वावलोकन',
    'hero.illustrativeValues': 'नमूना आंकड़े',
    'hero.blockForecast': 'ब्लॉक पूर्वानुमान',
    'hero.aiDownscalingLabel': 'एआई डाउनस्केलिंग',
    'hero.elevation': 'भूमि की ऊंचाई',
    'hero.vegetation': 'वनस्पति आवरण',
    'hero.landUse': 'भूमि उपयोग',
    'hero.panchayatForecast': 'पंचायत पूर्वानुमान',
    'hero.pipelineHeading': 'मौसम से किसान सलाह प्रक्रिया',
    'hero.pipelineDesc':
      'राष्ट्रीय मॉडल से लेकर किसान के खेत तक सटीक मौसम और कृषि निर्णय पहुंचाने की प्रणाली।',

    // Features
    'feat.highResTitle': 'अति-सटीक स्थानिक पूर्वानुमान',
    'feat.highResDesc': 'बड़े क्षेत्र के पूर्वानुमान को प्रत्येक ग्राम पंचायत के लिए 1 किमी स्तर पर परिवर्तित किया जाता है।',
    'feat.aiTitle': 'एआई-आधारित डाउनस्केलिंग',
    'feat.aiDesc': 'स्थानीय स्थलाकृति और पर्यावरण के आधार पर तापमान और वर्षा का सटीक आकलन।',
    'feat.multiSourceTitle': 'विविध स्रोतों से जानकारी',
    'feat.multiSourceDesc': 'उपग्रह, वेधशाला, मिट्टी और भौगोलिक आंकड़ों का एकीकृत विश्लेषण।',
    'feat.localizedTitle': 'किसानों के लिए फसल सलाह',
    'feat.localizedDesc': 'प्रत्येक पंचायत के लिए सिंचाई, छिड़काव, कटाई और कीट प्रबंधन की स्पष्ट सलाह।',

    // Home Weather Section
    'weather.grassrootsEyebrow': 'स्थानीय मौसम बुद्धिमत्ता',
    'weather.liveDownscaled': 'लाइव एआई विश्लेषित',
    'weather.dashboardTitle': 'ग्राम पंचायत मौसम डैशबोर्ड',
    'weather.dashboardDesc':
      'ऊंचाई, जीआईएस और उपग्रह डेटा के आधार पर ब्लॉक पूर्वानुमान से विकसित सूक्ष्म मौसम स्थिति।',
    'weather.selectLocationTitle': 'जिला चुनें → ब्लॉक चुनें → ग्राम पंचायत चुनें',
    'weather.selectLocationDesc':
      'अपने क्षेत्र के स्थानीय मौसम की विस्तृत जानकारी देखने के लिए स्थान का चयन करें',
    'weather.district': 'जिला',
    'weather.block': 'ब्लॉक / तहसील',
    'weather.panchayat': 'ग्राम पंचायत',
    'weather.currentLocation': 'चयनित स्थान:',
    'weather.forecastDate': 'पूर्वानुमान तिथि:',
    'weather.center': 'अक्षांश/देशांतर:',
    'weather.blockAvg': 'ब्लॉक औसत से',
    'weather.sinnarAvg': 'सिन्नर औसत से',

    // Weather Metrics
    'metric.rainfall': 'वर्षा (बारिश)',
    'metric.precipitation': 'वर्षा की स्थिति',
    'metric.temperature': 'तापमान',
    'metric.thermalCondition': 'थर्मल प्रोफाइल',
    'metric.humidity': 'हवा में नमी (आर्द्रता)',
    'metric.relativeMoisture': 'सापेक्ष आर्द्रता',
    'metric.windSpeed': 'हवा की गति',
    'metric.airCirculation': 'हवा का प्रवाह',
    'metric.feelsLike': 'महसूस तापमान',
    'metric.dewPoint': 'ओसांक (Dew Point)',
    'metric.probability': 'बारिश की संभावना',
    'metric.advisory': 'कृषि सलाह:',

    // AI Insight Banner
    'ai.calibrationTitle': 'एआई सटीकता समायोजन:',
    'ai.calibrationText':
      'एसआरटीएम ऊंचाई, एनडीवीआई वनस्पति सूचकांक और स्थानीय स्थलाकृति के आधार पर एआई मॉडल स्थानीय मौसम को सटीक बनाते हैं।',
    'ai.detailedForecast': 'विस्तृत 7-दिवसीय पूर्वानुमान',
    'ai.openGisMap': 'जीआईएस नक्शे में देखें',

    // Weather Map Page
    'map.searchPlaceholder': 'पंचायत, ब्लॉक या शहर खोजें...',
    'map.panchayatLevel': 'पंचायत स्तर (1 किमी)',
    'map.blockLevel': 'ब्लॉक स्तर',
    'map.bothLevels': 'दोनों स्तर',
    'map.downscaled1km': '1 किमी एआई सुपर-रिज़ॉल्यूशन',
    'map.coarse25km': '25 किमी वैश्विक पूर्वानुमान',
    'map.compare': 'तुलना (25 किमी बनाम 1 किमी)',
    'map.runDownscaler': 'एआई डाउनस्केलर चलाएं',
    'map.liveApiData': 'लाइव मौसम डेटा (IMD/GFS)',
    'map.legend': 'रंग सूचकांक',
    'map.forecastHours': 'समय अनुसार पूर्वानुमान',
    'map.quickLayers': 'मौसम परतें',
    'map.rainLayer': 'वर्षा परत',
    'map.tempLayer': 'तापमान परत',
    'map.windLayer': 'हवा की गति',
    'map.humidityLayer': 'नमी परत',
    'map.satelliteLayer': 'उपग्रह बादल',
    'map.soilLayer': 'मिट्टी की नमी',
    'map.viewAdvisory': 'कृषि सलाह देखें →',
    'map.highRisk': '🔴 उच्च मौसम जोखिम',
    'map.advisoryAvailable': '🟡 कृषि सलाह उपलब्ध',
    'map.normalWeather': '🟢 मौसम सामान्य',

    // Crop Advisory Keys
    'crop.selectCropTitle': '🌾 अपनी फसल चुनें',
    'crop.selectCropSubtitle': 'मौसम के अनुसार सटीक सलाह के लिए मुख्य फसल का चयन करें',
    'crop.stageTitle': '🌱 फसल की अवस्था क्या है?',
    'crop.stageSubtitle': 'सटीक कृषि सलाह तैयार करने के लिए वर्तमान अवस्था चुनें',
    'crop.locationTitle': '📍 चयनित स्थान (Panchayat)',
    'crop.changeLocation': 'स्थान बदलें',
    'crop.changeCropStage': 'फसल या अवस्था बदलें',
    'crop.saveAsMyFarm': 'मेरा खेत सहेजें',
    'crop.farmSaved': 'खेत सहेजा गया!',
    'crop.welcomeBack': 'वापसी पर स्वागत है 👋',
    'crop.todayAdvisory': 'आज की फसल सलाह',
    'crop.listen': '🔊 सुनें / Listen',
    'crop.stopListening': 'रोकें',
    'crop.speaking': 'पढ़ रहा है...',
    'crop.whyThisAdvisory': '🤖 यह सलाह क्यों दी गई? (प्रक्रिया)',
    'crop.forecastConfidence': 'पूर्वानुमान विश्वसनीयता:',
    'crop.confidenceHigh': '🟢 उच्च विश्वसनीयता (High)',
    'crop.confidenceMedium': '🟡 मध्यम (Medium)',
    'crop.confidenceLow': '🔴 कम (Low)',
    'crop.forecastDetails': '📊 मौसम विवरण एवं डेटा स्रोत',
    'crop.actionOrientedHeadline': '👨‍🌾 आज की किसान सलाह (कार्य-उन्मुख सिफारिशें)',
    'crop.weatherOverview': 'स्थानीय मौसम की स्थिति',

    // General
    'common.language': 'भाषा',
    'common.langEnglish': 'English',
    'common.langMarathi': 'मराठी',
    'common.langHindi': 'हिंदी',
    'common.demoBadge': 'डेमो डेटा',
    'common.loading': 'डेटा लोड हो रहा है...',
    'common.goHome': 'होम पेज पर जाएं',
    'common.tryAgain': 'पुनः प्रयास करें',
    'common.uncertainty': 'अनिश्चितता: मॉडल कैलिब्रेशन के बाद उपलब्ध होगी',
    'common.viewMap': 'नक्शे पर देखें',
    'common.methodologyFooter': 'कार्यप्रणाली',
    'common.modelDashboardFooter': 'मॉडल डैशबोर्ड',
  },
  en: {
    // Brand & Taglines
    'brand.name': 'VataVaran',
    'brand.subtitle': 'Panchayat-level climate intelligence · Demonstration platform',
    'brand.logoBadge': 'Spatial Downscaling & Crop Advisory Studio',

    // Navigation Links
    'nav.home': 'Home',
    'nav.weatherMap': 'Weather Map',
    'nav.cropAdvisory': '🌾 Crop Advisory',
    'nav.forecast': 'Forecast',
    'nav.aiDownscaling': 'AI Downscaling',
    'nav.historical': 'Historical',
    'nav.methodology': 'Methodology',
    'nav.alerts': 'Alerts',
    'nav.dashboard': 'Model Dashboard',
    'nav.exploreMap': 'Explore Map',

    // Hero Section
    'hero.badge': 'SIH 2024 · Demonstration Platform',
    'hero.eyebrow': 'AI + GIS climate intelligence',
    'hero.titlePrefix': 'From Block-Level Forecasts to ',
    'hero.titleHighlight': 'Panchayat-Level',
    'hero.titleSuffix': ' Weather & Crop Advisory',
    'hero.description':
      'AI-powered spatial downscaling delivering hyper-local weather forecasts and actionable agricultural advisories to grassroots farmers.',
    'hero.exploreMapBtn': 'Explore Weather Map',
    'hero.cropAdvisoryBtn': '🌾 Get Crop Advisory',
    'hero.howAiWorksBtn': 'How AI Works',
    'hero.downscalingPreview': 'Downscaling preview',
    'hero.illustrativeValues': 'Illustrative values',
    'hero.blockForecast': 'BLOCK FORECAST',
    'hero.aiDownscalingLabel': 'AI DOWNSCALING',
    'hero.elevation': 'Elevation',
    'hero.vegetation': 'Vegetation',
    'hero.landUse': 'Land use',
    'hero.panchayatForecast': 'PANCHAYAT FORECAST',
    'hero.pipelineHeading': 'Weather to Farm Decision Pipeline',
    'hero.pipelineDesc':
      'From national weather models to hyper-local farm-scale atmospheric insights and action-oriented crop recommendations.',

    // Features
    'feat.highResTitle': 'High-Resolution Forecasting',
    'feat.highResDesc': 'Block-level weather converted into 1km Panchayat-level information.',
    'feat.aiTitle': 'AI-Powered Downscaling',
    'feat.aiDesc': 'Models learn spatial and temporal relationships across micro-climates.',
    'feat.multiSourceTitle': 'Multi-Source Data',
    'feat.multiSourceDesc': 'Weather, satellite, GIS, soil, elevation and LULC data combined.',
    'feat.localizedTitle': 'Actionable Crop Advisories',
    'feat.localizedDesc': 'Precise guidance on irrigation, spraying, sowing, harvesting, and pest risks for farmers.',

    // Home Weather Section
    'weather.grassrootsEyebrow': 'Grassroots Climate Intelligence',
    'weather.liveDownscaled': 'Live Downscaled',
    'weather.dashboardTitle': 'Panchayat Weather Dashboard',
    'weather.dashboardDesc':
      'Precision micro-climate outlook downscaled from block forecasts using elevation, GIS, and satellite data.',
    'weather.selectLocationTitle': 'Select District → Block → Panchayat',
    'weather.selectLocationDesc':
      'Filter localized weather parameters by your administrative location',
    'weather.district': 'District',
    'weather.block': 'Block / Taluka',
    'weather.panchayat': 'Gram Panchayat',
    'weather.currentLocation': 'Current Location:',
    'weather.forecastDate': 'Forecast Date:',
    'weather.center': 'Center:',
    'weather.blockAvg': 'vs block avg',
    'weather.sinnarAvg': 'vs Sinnar block',

    // Weather Metrics
    'metric.rainfall': 'Rainfall',
    'metric.precipitation': 'Precipitation',
    'metric.temperature': 'Temperature',
    'metric.thermalCondition': 'Thermal Condition',
    'metric.humidity': 'Humidity',
    'metric.relativeMoisture': 'Relative Moisture',
    'metric.windSpeed': 'Wind Speed',
    'metric.airCirculation': 'Air Circulation',
    'metric.feelsLike': 'Feels',
    'metric.dewPoint': 'Dew point',
    'metric.probability': 'Rain Probability',
    'metric.advisory': 'Agronomic advisory:',

    // AI Insight Banner
    'ai.calibrationTitle': 'AI Spatial Calibration:',
    'ai.calibrationText':
      'Multi-source models adjust IMD block forecasts using SRTM elevation, NDVI vegetation index, and local topography.',
    'ai.detailedForecast': 'Detailed 7-Day Forecast',
    'ai.openGisMap': 'Open in GIS Weather Map',

    // Weather Map Page
    'map.searchPlaceholder': 'Search Panchayat, Block or City...',
    'map.panchayatLevel': 'Panchayat Level (1km)',
    'map.blockLevel': 'Block Level',
    'map.bothLevels': 'Both Levels',
    'map.downscaled1km': '1km AI Super-Resolution',
    'map.coarse25km': '25km Coarse Global NWP',
    'map.compare': 'Coarse vs 1km Delta',
    'map.runDownscaler': 'Run Downscaler',
    'map.liveApiData': 'Live IMD/GFS Telemetry',
    'map.legend': 'Color Legend',
    'map.forecastHours': 'Forecast Timeline',
    'map.quickLayers': 'Weather Layers',
    'map.rainLayer': 'Downscaled Rain',
    'map.tempLayer': 'Temperature',
    'map.windLayer': 'Wind Streamlines',
    'map.humidityLayer': 'Humidity',
    'map.satelliteLayer': 'Satellite Cloud',
    'map.soilLayer': 'Soil Moisture',
    'map.viewAdvisory': 'View Advisory →',
    'map.highRisk': '🔴 HIGH WEATHER RISK',
    'map.advisoryAvailable': '🟡 Agricultural Advisory Available',
    'map.normalWeather': '🟢 Normal Weather Conditions',

    // Crop Advisory Keys
    'crop.selectCropTitle': '🌾 Select Your Crop',
    'crop.selectCropSubtitle': 'Choose your primary crop to generate tailored weather guidance',
    'crop.stageTitle': '🌱 What is the crop stage?',
    'crop.stageSubtitle': 'Select growth phase to get actionable farm management rules',
    'crop.locationTitle': '📍 Selected Location (Panchayat)',
    'crop.changeLocation': 'Change Location',
    'crop.changeCropStage': 'Change Crop / Stage',
    'crop.saveAsMyFarm': 'Save as My Farm',
    'crop.farmSaved': 'Farm Saved!',
    'crop.welcomeBack': 'Welcome back 👋',
    'crop.todayAdvisory': "Today's Advisory",
    'crop.listen': '🔊 Listen',
    'crop.stopListening': 'Stop',
    'crop.speaking': 'Reading advisory...',
    'crop.whyThisAdvisory': '🤖 Why this advisory? (Decision Pipeline)',
    'crop.forecastConfidence': 'Forecast Confidence:',
    'crop.confidenceHigh': '🟢 High Confidence',
    'crop.confidenceMedium': '🟡 Medium Confidence',
    'crop.confidenceLow': '🔴 Low Confidence',
    'crop.forecastDetails': '📊 Forecast Details & Data Sources',
    'crop.actionOrientedHeadline': "👨‍🌾 TODAY'S FARM ADVISORY (Action-Oriented)",
    'crop.weatherOverview': 'Localized Weather Conditions',

    // General
    'common.language': 'Language',
    'common.langEnglish': 'English',
    'common.langMarathi': 'मराठी',
    'common.langHindi': 'हिंदी',
    'common.demoBadge': 'Demo Data',
    'common.loading': 'Loading weather data...',
    'common.goHome': 'Go home',
    'common.tryAgain': 'Try again',
    'common.uncertainty': 'Uncertainty: Available after model calibration',
    'common.viewMap': 'View on map',
    'common.methodologyFooter': 'Methodology',
    'common.modelDashboardFooter': 'Model dashboard',
  },
}

// Location names mapping
const placeNames: Record<string, { mr: string; hi: string }> = {
  // Districts
  Nashik: { mr: 'नाशिक', hi: 'नासिक' },
  Pune: { mr: 'पुणे', hi: 'पुणे' },
  Wardha: { mr: 'वर्धा', hi: 'वर्धा' },
  Nagpur: { mr: 'नागपूर', hi: 'नागपुर' },
  nashik: { mr: 'नाशिक', hi: 'नासिक' },
  pune: { mr: 'पुणे', hi: 'पुणे' },
  wardha: { mr: 'वर्धा', hi: 'वर्धा' },
  nagpur: { mr: 'नागपूर', hi: 'नागपुर' },

  // Blocks
  Sinnar: { mr: 'सिन्नर', hi: 'सिन्नर' },
  sinnar: { mr: 'सिन्नर', hi: 'सिन्नर' },
  Dindori: { mr: 'दिंडोरी', hi: 'दिंडोरी' },
  dindori: { mr: 'दिंडोरी', hi: 'दिंडोरी' },
  Niphad: { mr: 'निफाड', hi: 'निफाड़' },
  niphad: { mr: 'निफाड', hi: 'निफाड़' },
  Haveli: { mr: 'हवेली', hi: 'हवेली' },
  haveli: { mr: 'हवेली', hi: 'हवेली' },
  Baramati: { mr: 'बारामती', hi: 'बारामती' },
  baramati: { mr: 'बारामती', hi: 'बारामती' },
  Shirur: { mr: 'शिरूर', hi: 'शिरूर' },
  shirur: { mr: 'शिरूर', hi: 'शिरूर' },
  Junnar: { mr: 'जुन्नर', hi: 'जुन्नर' },
  junnar: { mr: 'जुन्नर', hi: 'जुन्नर' },
  Seloo: { mr: 'सेलू', hi: 'सेलू' },
  seloo: { mr: 'सेलू', hi: 'सेलू' },
  Deoli: { mr: 'देवळी', hi: 'देवली' },
  deoli: { mr: 'देवळी', hi: 'देवली' },
  Arvi: { mr: 'आर्वी', hi: 'आर्वी' },
  arvi: { mr: 'आर्वी', hi: 'आर्वी' },
  'Nagpur Rural': { mr: 'नागपूर ग्रामीण', hi: 'नागपुर ग्रामीण' },
  nagpur_rural: { mr: 'नागपूर ग्रामीण', hi: 'नागपुर ग्रामीण' },
  Kamptee: { mr: 'कामठी', hi: 'कामठी' },
  kamptee: { mr: 'कामठी', hi: 'कामठी' },
  Hingna: { mr: 'हिंगणा', hi: 'हिंगणा' },
  hingna: { mr: 'हिंगणा', hi: 'हिंगणा' },
  Katol: { mr: 'काटोल', hi: 'काटोल' },
  katol: { mr: 'काटोल', hi: 'काटोल' },
  Mulshi: { mr: 'मुळशी', hi: 'मुलशी' },
  mulshi: { mr: 'मुळशी', hi: 'मुलशी' },

  // Panchayats
  Dubera: { mr: 'डुबेरा', hi: 'डुबेरा' },
  dubera: { mr: 'डुबेरा', hi: 'डुबेरा' },
  Panchale: { mr: 'पांचाळे', hi: 'पांचाल' },
  panchale: { mr: 'पांचाळे', hi: 'पांचाल' },
  Konambe: { mr: 'कोनांबे', hi: 'कोनांबे' },
  konambe: { mr: 'कोनांबे', hi: 'कोनांबे' },
  Wavi: { mr: 'वावी', hi: 'वावी' },
  wavi: { mr: 'वावी', hi: 'वावी' },
  Vani: { mr: 'वणी', hi: 'वणी' },
  vani: { mr: 'वणी', hi: 'वणी' },
  'Pimpalgaon Baswant': { mr: 'पिंपळगाव बसवंत', hi: 'पिंपलगांव बसवंत' },
  pimpalgaon_baswant: { mr: 'पिंपळगाव बसवंत', hi: 'पिंपलगांव बसवंत' },
  Ozar: { mr: 'ओझर', hi: 'ओझर' },
  ozar: { mr: 'ओझर', hi: 'ओझर' },
  Wagholi: { mr: 'वाघोली', hi: 'वाघोली' },
  wagholi: { mr: 'वाघोली', hi: 'वाघोली' },
  'Uruli Kanchan': { mr: 'उरुळी कांचन', hi: 'उरुली कांचन' },
  uruli_kanchan: { mr: 'उरुळी कांचन', hi: 'उरुली कांचन' },
  'Malegaon Bk': { mr: 'माळेगाव बुद्रुक', hi: 'मालेगांव बुद्रुक' },
  malegaon_bk: { mr: 'माळेगाव बुद्रुक', hi: 'मालेगांव बुद्रुक' },
  Shikrapur: { mr: 'शिक्रापूर', hi: 'शिक्रापुर' },
  shikrapur: { mr: 'शिक्रापूर', hi: 'शिक्रापुर' },
  Narayangaon: { mr: 'नारायणगाव', hi: 'नारायणगांव' },
  narayangaon: { mr: 'नारायणगाव', hi: 'नारायणगांव' },
  Otur: { mr: 'ओतूर', hi: 'ओतूर' },
  otur: { mr: 'ओतूर', hi: 'ओतूर' },
  Sevagram: { mr: 'सेवाग्राम', hi: 'सेवाग्राम' },
  sevagram: { mr: 'सेवाग्राम', hi: 'सेवाग्राम' },
  'Seloo Kate': { mr: 'सेलू काटे', hi: 'सेलू काटे' },
  seloo_kate: { mr: 'सेलू काटे', hi: 'सेलू काटे' },
  Sindi: { mr: 'सिंदी', hi: 'सिंदी' },
  sindi: { mr: 'सिंदी', hi: 'सिंदी' },
  Paud: { mr: 'पौड', hi: 'पौड' },
  paud: { mr: 'पौड', hi: 'पौड' },
  Khadakwasla: { mr: 'खडकवासला', hi: 'खडकवासला' },
  khadakwasla: { mr: 'खडकवासला', hi: 'खडकवासला' },
}

const conditions: Record<string, { mr: string; hi: string }> = {
  'Moderate Rain': { mr: 'मध्यम पाऊस', hi: 'मध्यम बारिश' },
  'Passing Showers': { mr: 'पावसाच्या हलक्या सरी', hi: 'हल्की बारिश की फुहारें' },
  'Light Showers': { mr: 'हलका पाऊस', hi: 'हल्की बारिश' },
  'Scattered Clouds': { mr: 'विखुरलेले ढग', hi: 'बिखरे हुए बादल' },
  'Partly Sunny': { mr: 'अंशतः ऊन', hi: 'आंशिक धूप' },
  'Partly Cloudy': { mr: 'अंशतः ढगाळ', hi: 'आंशिक बादल' },
  'Overcast & Rainy': { mr: 'ढगाळ आणि पावसाळी', hi: 'घने बादल और बारिश' },
  Cloudy: { mr: 'ढगाळ वातावरण', hi: 'बादल छाए रहेंगे' },
  Sunny: { mr: 'निरभ्र ऊन', hi: 'तेज धूप' },
  'Clear Sky': { mr: 'निरभ्र आकाश', hi: 'साफ आसमान' },
  'Heavy Showers': { mr: 'मुसळधार पाऊस', hi: 'भारी बारिश' },
  'Heavy Rain': { mr: 'मुसळधार पाऊस', hi: 'मूसलाधार बारिश' },
  'Heavy Overcast': { mr: 'अति-ढगाळ वातावरण', hi: 'घने काले बादल' },
  'Passing Clouds': { mr: 'वळवाचे ढग', hi: 'गुजरते बादल' },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Marathi is default language for Maharashtra grassroots farmers
  const [language, setLanguageState] = useState<Language>('mr')

  useEffect(() => {
    const saved = localStorage.getItem('vatavaran_lang') as Language | null
    if (saved === 'mr' || saved === 'hi' || saved === 'en') {
      setLanguageState(saved)
      document.documentElement.lang = saved
    } else {
      // Default to Marathi
      setLanguageState('mr')
      document.documentElement.lang = 'mr'
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem('vatavaran_lang', lang)
      document.documentElement.lang = lang
    } catch {
      // Ignore if localStorage unavailable
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'mr' ? 'hi' : language === 'hi' ? 'en' : 'mr')
  }

  const t = (key: string, fallback?: string): string => {
    const dict = translations[language] || translations.mr
    return dict[key] ?? translations.en[key] ?? fallback ?? key
  }

  const getPlaceName = (name: string): string => {
    if (language === 'en') return name
    const item = placeNames[name] || placeNames[name.toLowerCase()]
    if (item) {
      return language === 'hi' ? item.hi : item.mr
    }
    return name
  }

  const getConditionName = (condition: string): string => {
    if (language === 'en') return condition
    const item = conditions[condition]
    if (item) {
      return language === 'hi' ? item.hi : item.mr
    }
    return condition
  }

  const getAdvisoryText = (advisory: string): string => {
    return advisory
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        getPlaceName,
        getConditionName,
        getAdvisoryText,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
