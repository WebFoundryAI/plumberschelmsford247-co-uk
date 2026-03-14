/**
 * Location-specific data including neighborhoods, landmarks, and drainage challenges
 */
export interface LocationData {
  neighborhoods: string[];
  landmarks: string[];
  drainageInfo: string;
  responseTime: string;
  propertyTypes: string;
}

export const LOCATION_DATA: Record<string, LocationData> = {
  chelmsford: {
    neighborhoods: ["Moulsham", "Springfield", "Great Baddow", "Writtle", "Broomfield", "Galleywood", "Chelmer Village", "Melbourne"],
    landmarks: ["Chelmsford Cathedral", "Hylands House", "Central Park", "Bond Street", "High Street", "Shire Hall", "Essex County Cricket Club", "Chelmsford City Racecourse"],
    drainageInfo: "Chelmsford's drainage infrastructure reflects its growth from a historic market town into Essex's only city. The city centre, built around the confluence of the rivers Can and Chelmer, has Victorian-era clay pipe networks still in active use. The dominant London Clay geology causes seasonal ground movement that stresses underground pipes, making cracked joints and root ingress among the most common drainage issues across the city. Newer developments at Beaulieu Park and Chancellor Park have modern plastic systems but often connect into older trunk sewers not designed for increased capacity.",
    responseTime: "typically within 60 minutes",
    propertyTypes: "Victorian terraces, Edwardian semis, 1930s housing, modern estates, and commercial premises"
  },
  witham: {
    neighborhoods: ["Newland Street", "Chipping Hill", "Maltings Lane", "Powers Hall End", "Rickstones", "Templars"],
    landmarks: ["Newland Street", "Witham Town Park", "River Brain", "Chipping Hill", "Dorothy L Sayers Centre", "The Grove Centre"],
    drainageInfo: "Witham is a historic market town on the River Brain with drainage spanning several centuries. The older town centre along Newland Street and Chipping Hill has Victorian-era clay pipes susceptible to root ingress, while newer estates on the outskirts have modern plastic systems. The River Brain's flood plain influences groundwater levels, and like much of Essex, Witham sits on London Clay with associated ground movement challenges.",
    responseTime: "typically within 60-75 minutes",
    propertyTypes: "period town houses, Victorian terraces, post-war semis, modern estates, and high street commercial units"
  },
  braintree: {
    neighborhoods: ["Bocking", "Great Notley", "Rayne", "Panfield Lane", "Braintree Town Centre", "Coggeshall Road"],
    landmarks: ["Braintree Town Centre", "Freeport Braintree", "Great Notley Country Park", "Public Gardens", "River Brain", "Bocking Church Street"],
    drainageInfo: "Braintree is a busy market town in north Essex with a wide range of property types, from historic buildings in the town centre and Bocking to modern developments at Great Notley. The River Brain passes through Braintree, and heavy Essex clay soil creates ground movement that stresses drainage pipes. Considerable housing growth in recent years has increased demand on legacy sewer infrastructure, contributing to drainage problems during heavy rainfall.",
    responseTime: "typically within 60-90 minutes",
    propertyTypes: "traditional town centre properties, Victorian terraces, modern family homes at Great Notley, and commercial premises"
  },
  maldon: {
    neighborhoods: ["Hythe Quay", "Maldon High Street", "Heybridge", "Langford", "Wickham Bishops", "Great Totham"],
    landmarks: ["Maldon High Street", "Hythe Quay", "Promenade Park", "Beeleigh Abbey", "River Blackwater", "All Saints Church"],
    drainageInfo: "Maldon is a picturesque riverside town at the head of the Blackwater Estuary. Properties on the lower slopes towards the Hythe face tidal influences on drainage systems. When high tides coincide with heavy rainfall, drainage network capacity is significantly reduced, causing surcharging at manholes. The older parts around the High Street and All Saints Church have drainage systems over a century old, subject to Essex clay ground movement and variable ground conditions near the river.",
    responseTime: "typically within 60-90 minutes",
    propertyTypes: "traditional weatherboard cottages, Georgian town houses, Victorian terraces, riverside properties, and modern housing"
  },
  brentwood: {
    neighborhoods: ["Shenfield", "Hutton", "Pilgrims Hatch", "Warley", "Brook Street", "Ingrave", "West Horndon"],
    landmarks: ["Brentwood High Street", "Brentwood Cathedral", "Shenfield Common", "South Weald Country Park", "Brentwood Centre", "Wilson's Corner"],
    drainageInfo: "Brentwood is a prosperous commuter town with excellent rail connections to London via Shenfield. The town sits on the southern edge of the London Clay belt, and many established residential streets are lined with mature trees. The combination of clay ground movement and tree root ingress is a particularly common cause of drainage failure. Properties in Shenfield, Hutton, and Pilgrims Hatch each have characteristic drainage challenges based on age and construction type.",
    responseTime: "typically within 60-75 minutes",
    propertyTypes: "large detached properties, Victorian and Edwardian terraces, 1930s semis, modern developments, and commercial premises"
  },
  billericay: {
    neighborhoods: ["Sun Corner", "Stock Road", "Norsey Wood", "Mountnessing", "Ramsden Bellhouse", "Outwood Common"],
    landmarks: ["Billericay High Street", "Lake Meadows", "Barleylands Farm", "Sun Corner", "St Mary Magdalen Church", "Norsey Wood"],
    drainageInfo: "Billericay is a thriving town in the Borough of Basildon with a wide range of property types from period cottages in the old town centre to 1930s semis and modern developments on the outskirts. The London Clay formation creates ongoing ground movement challenges, and properties with mature trees face significant root ingress risks. Where older clay pipe systems connect to newer plastic installations, junction points can be vulnerable to failure.",
    responseTime: "typically within 60-90 minutes",
    propertyTypes: "period cottages, 1930s semis, post-war housing, modern estates, and high street commercial units"
  },
  ingatestone: {
    neighborhoods: ["Fryerning", "Mill Green", "Buttsbury", "Stock Lane", "Roman Road", "Ingatestone High Street"],
    landmarks: ["Ingatestone High Street", "Ingatestone Hall", "St Edmund and St Mary's Church", "Ingatestone Railway Station", "Mill Green Common"],
    drainageInfo: "Ingatestone is a historic village in the Borough of Brentwood centred around its attractive High Street and Tudor Ingatestone Hall. Some properties rely on private drainage systems including septic tanks and treatment plants rather than mains drainage. The village sits on London Clay, and properties along the older High Street have drainage infrastructure over a century old, susceptible to root ingress and joint displacement.",
    responseTime: "typically within 60-90 minutes",
    propertyTypes: "period cottages, Tudor-era properties, post-war housing, modern family homes, and rural properties with private drainage"
  },
  "great-baddow": {
    neighborhoods: ["Baddow Road", "The Vineyards", "Meadgate", "Longmead", "Noakes", "Tabors Avenue", "Beehive Lane"],
    landmarks: ["Baddow Road", "The Vineyards", "Great Baddow Recreation Ground", "St Mary the Virgin Church", "Noakes Place", "Meadgate Avenue"],
    drainageInfo: "Great Baddow is a large residential suburb on the south-eastern edge of Chelmsford. Many properties were built in the 1950s-70s with clay or pitch fibre drainage pipes now approaching the end of their expected service life. The heavy Essex clay soil creates ground movement that stresses buried pipes, and mature garden trees send roots into cracked joints, making this one of the most common causes of blockages we encounter in Great Baddow.",
    responseTime: "typically within 45-60 minutes",
    propertyTypes: "1930s semis, 1950s-70s family homes, modern developments, and period properties along Baddow Road"
  },
  springfield: {
    neighborhoods: ["Beaulieu Park", "Chelmer Village", "Springfield Barnes", "Cuton Hall Lane", "White Hart Lane", "Sandford Mill"],
    landmarks: ["Beaulieu Park", "Chelmer Village", "Springfield Hall Park", "All Saints Church Springfield", "Sandford Mill", "Springfield Road"],
    drainageInfo: "Springfield is one of the largest suburbs of Chelmsford, situated to the north-east of the city centre. The area presents a mix of drainage challenges: newer developments at Beaulieu Park have modern plastic systems with sustainable drainage features, while established areas along Springfield Road and Chelmer Village have systems from the 1970s-80s that are now ageing. The River Chelmer flows through the eastern edge, and properties near the river corridor can experience elevated groundwater during wet periods.",
    responseTime: "typically within 45-60 minutes",
    propertyTypes: "modern homes at Beaulieu Park, 1970s-80s estates, Chelmer Village properties, and commercial units"
  }
};

/**
 * Service-specific content for each location
 */
export interface ServiceContent {
  intro: string;
  commonProblems: string[];
  process: string;
  localTip: string;
}

type LocationServiceContentMap = Record<string, Record<string, ServiceContent>>;

export const LOCATION_SERVICE_CONTENT: LocationServiceContentMap = {
  chelmsford: {
    "blocked-drains": {
      intro: "Chelmsford's development from a historic market town into Essex's only city means blocked drains can affect anything from a Victorian terrace near the High Street to a modern family home in Beaulieu Park. Our experienced engineers understand the unique drainage challenges facing properties across Chelmsford and respond quickly to restore your system to full working order.",
      commonProblems: ["Fat and grease buildup in older city centre properties", "Tree root intrusion from mature street trees in Moulsham and Writtle", "Debris accumulation in Victorian-era clay pipes", "Wet wipe blockages in modern housing estates", "Foreign object obstructions in commercial premises along the High Street"],
      process: "We begin with a thorough assessment of your drainage system, often using CCTV cameras to pinpoint the exact location and cause of the blockage. Our high-pressure jetting equipment can clear even the most stubborn obstructions, and we always provide advice on preventing future blockages.",
      localTip: "Properties in Chelmsford's tree-lined streets in Moulsham and Writtle should consider annual drain inspections to catch root intrusion early, especially given the London Clay soil movement that opens pipe joints."
    },
    "drain-unblocking": {
      intro: "When your drains back up in Chelmsford, you need a fast response from engineers who know the local area. Whether you're in the city centre, Springfield, or Great Baddow, our drain unblocking teams are strategically positioned across Chelmsford to reach you quickly and resolve the problem efficiently.",
      commonProblems: ["Kitchen sink blockages from food waste", "Bathroom drain clogs from hair and soap scum", "External drain blockages from leaves and debris", "Shared drainage issues in terraced housing near Moulsham Street", "Commercial kitchen drain problems in city centre restaurants"],
      process: "Our engineers arrive equipped with manual rods, electric eels, and high-pressure jetting equipment to handle any unblocking situation. We identify the blockage type, select the appropriate method, and clear your drains while minimising disruption to your property.",
      localTip: "Chelmsford's busy restaurants and cafes along the High Street and Moulsham Street benefit from grease trap maintenance to prevent drain blockages."
    },
    "cctv-drain-surveys": {
      intro: "Understanding what's happening inside your Chelmsford property's drainage system has never been easier. Our advanced CCTV drain surveys provide crystal-clear footage of pipe conditions, helping identify issues before they become emergencies. This is particularly valuable for Chelmsford's older properties with Victorian-era clay drainage near the city centre.",
      commonProblems: ["Hidden cracks in ageing clay pipes", "Displaced joints causing leaks", "Root ingress at pipe connections", "Scale and deposit buildup from Essex hard water", "Structural damage from London Clay ground movement"],
      process: "We insert a high-definition camera into your drainage system, recording footage that clearly shows the condition of your pipes. You receive a detailed report with findings, recommendations, and annotated images showing any areas of concern.",
      localTip: "Buying a property in Chelmsford's established suburbs like Moulsham or Writtle? A pre-purchase CCTV survey can reveal hidden drainage issues caused by clay soil movement that could cost thousands to repair."
    },
    "drain-jetting": {
      intro: "High-pressure drain jetting is the most effective way to clear stubborn blockages and clean Chelmsford's often ageing pipe systems. Our specialist equipment delivers water at pressures up to 4,000 PSI, cutting through grease, scale, and debris while being gentle on pipe walls.",
      commonProblems: ["Heavy grease accumulation in kitchen waste pipes", "Scale buildup from Essex hard water supply", "Compacted debris and sediment", "Root masses blocking flow in clay pipe systems", "General pipe cleaning needs across all property types"],
      process: "Our jetting equipment is carefully inserted into your drainage system, with the water pressure adjusted to suit your pipe type and condition. The rotating nozzle scours the pipe walls clean while flushing debris towards the sewer connection.",
      localTip: "Essex hard water contributes to scale buildup in Chelmsford pipes. Regular jetting every 12-18 months keeps systems flowing freely and prevents costly blockages from developing."
    },
    "emergency-drain-services": {
      intro: "Drainage emergencies don't wait for convenient times, and neither do we. Our Chelmsford emergency response teams operate around the clock, ready to tackle overflowing drains, flooding, and sewage backups anywhere in the city. From Moulsham terraces to Springfield family homes, we're there when you need us most.",
      commonProblems: ["Overflowing manholes and drains during heavy rainfall", "Sewage backing up into properties", "Flooding from blocked surface drains near the rivers Can and Chelmer", "Collapsed drains causing sinkholes in clay soil", "Foul odours indicating serious pipe damage"],
      process: "Call our emergency line and we'll dispatch the nearest available engineer to your Chelmsford location. They'll assess the situation, implement immediate containment if needed, and work to resolve the emergency quickly and safely.",
      localTip: "Know where your external manhole covers are located. In a drainage emergency, this information helps our engineers begin work immediately upon arrival."
    },
    "drain-repairs": {
      intro: "Chelmsford's mix of Victorian city centre infrastructure and modern suburban developments means drain repairs require both traditional skills and contemporary techniques. Our repair specialists handle everything from patching minor cracks to complete pipe replacement, always selecting the most cost-effective approach for your specific situation.",
      commonProblems: ["Cracked and fractured clay pipes from ground movement", "Displaced or misaligned joints in ageing systems", "Tree root damage in established residential streets", "Pitch fibre pipe deterioration in 1960s-70s housing", "Subsidence-related damage from London Clay shrinkage"],
      process: "We assess the damage using CCTV inspection, then recommend the most appropriate repair method. Options range from no-dig pipe relining for accessible damage to excavation for severely collapsed sections. All repairs come with our workmanship guarantee.",
      localTip: "Chelmsford's London Clay subsoil causes significant pipe movement during wet and dry cycles. Watch for slow drainage or damp patches in your garden as early warning signs of pipe damage."
    }
  },
  witham: {
    "blocked-drains": {
      intro: "Witham's mix of historic market town properties along Newland Street and modern housing estates on the outskirts creates diverse drainage challenges. Our Witham blocked drain specialists understand how the River Brain's flood plain and the Essex clay geology affect drainage systems across the town, from Chipping Hill's period homes to the newer developments at Maltings Lane.",
      commonProblems: ["Root intrusion from mature trees along Newland Street", "Fat and grease buildup in domestic kitchens", "Debris accumulation in Victorian clay pipes in the old town", "Silt ingress from surface water near the River Brain", "Blockages in shared drainage serving commercial premises"],
      process: "We assess your Witham property's drainage configuration before selecting the most effective clearing method. Properties near the River Brain may require different approaches than those on higher ground. Our engineers are experienced with all Witham property types and drainage systems.",
      localTip: "Witham properties near the River Brain corridor should ensure external drains have adequate gully pots to catch debris, particularly after heavy rain when the water table rises and places back pressure on drainage systems."
    },
    "drain-unblocking": {
      intro: "When drains block in Witham, our local teams respond quickly with the expertise your situation demands. Whether you're dealing with a backed-up kitchen sink on Newland Street or an overflowing external drain in Chipping Hill, we'll have your drainage flowing freely again.",
      commonProblems: ["Kitchen waste accumulation", "Bathroom drain blockages from hair and soap", "External gulley obstructions from garden debris", "Toilet blockages from inappropriate flushing", "Shared drainage issues in town centre commercial properties"],
      process: "Our Witham engineers arrive with comprehensive unblocking equipment suitable for all drain types. We assess the blockage location and severity, then apply the most effective clearing technique, ensuring complete removal of the obstruction.",
      localTip: "Witham's older properties along Newland Street and Chipping Hill often have deep external manholes. Regular clearing prevents serious blockages from developing."
    },
    "cctv-drain-surveys": {
      intro: "Witham's architectural variety, from period properties on Newland Street to modern estates, means drainage systems vary significantly. Our CCTV surveys reveal exactly what's inside your pipes, providing invaluable information for property purchasers, sellers, and homeowners investigating persistent drainage problems.",
      commonProblems: ["Age-related pipe deterioration in the old town", "Root ingress from garden vegetation", "Ground movement affecting joints in clay soil", "Historical modifications and unknown connections", "Condition assessment for property transactions"],
      process: "We survey your entire drainage system, documenting condition, identifying defects, and noting any areas requiring attention. The final report includes annotated footage, a condition summary, and maintenance recommendations specific to your property.",
      localTip: "Purchasing a period property in Witham's conservation area around Chipping Hill? A CCTV survey can identify ageing drainage that may need specialist attention before you commit."
    },
    "drain-jetting": {
      intro: "High-pressure jetting provides the deep cleaning that Witham's varied drainage systems often need. From clearing deposits in the town centre's traditional pipes to routine maintenance for newer estates, our jetting service restores optimal drainage performance across the town.",
      commonProblems: ["Grease buildup in residential and commercial drains", "Scale deposits from Essex hard water", "Silt and sediment in surface water drainage near the River Brain", "Root fragments after removal treatments", "General maintenance cleaning"],
      process: "We select jetting equipment and settings appropriate for your pipe material and the deposits being removed. The process is controlled and methodical, ensuring thorough cleaning without risk of damage to your drainage system.",
      localTip: "Witham's commercial properties along Newland Street benefit from regular jetting schedules to prevent emergency blockages and maintain compliance with drainage regulations."
    },
    "emergency-drain-services": {
      intro: "Drainage emergencies in Witham receive rapid response from our local teams, day or night. From flooded gardens near the River Brain to sewage issues in the town centre, our engineers are ready to tackle any emergency situation and protect your property from further damage.",
      commonProblems: ["Sewage backflow into properties", "Garden flooding from blocked drains during heavy rain", "Overflowing inspection chambers", "Collapsed drains causing subsidence in clay soil", "Storm damage to drainage systems"],
      process: "Emergency calls to our Witham service trigger immediate dispatch. We provide estimated arrival times and arrive prepared for the reported situation. Our priority is containing the emergency, then implementing a lasting solution.",
      localTip: "Witham properties near the River Brain are prone to surface water issues during heavy rain when the water table rises. Keeping gullies and manhole covers clear helps prevent property flooding."
    },
    "drain-repairs": {
      intro: "Witham's diverse property ages mean drain repairs must be tailored to specific situations. Whether you need no-dig relining for a Victorian pipe on Newland Street or excavation repairs in a newer development, our repair specialists have the skills and equipment for the job.",
      commonProblems: ["Cracked and fractured clay pipes in older properties", "Displaced joints from London Clay ground movement", "Root damage requiring intervention", "Age-related deterioration of original drainage", "Damage from utility works and construction"],
      process: "Following thorough investigation, we recommend the most cost-effective repair approach. We explain all options clearly, including likely outcomes and any ongoing maintenance requirements. All repairs are guaranteed for your peace of mind.",
      localTip: "Witham's clay soil conditions can cause seasonal pipe movement. Consider flexible repair solutions like structural liners that accommodate minor ground movement without cracking."
    }
  },
  braintree: {
    "blocked-drains": {
      intro: "Braintree's mix of historic town centre properties, traditional homes in Bocking, and modern developments at Great Notley creates varied drainage challenges. Our Braintree blocked drain specialists bring local knowledge and specialist equipment to clear any obstruction, from ageing clay pipes to modern plastic systems.",
      commonProblems: ["Debris accumulation in ageing town centre drainage", "Root intrusion from established trees in Bocking's mature gardens", "Fat and grease buildup in domestic and commercial kitchens", "Shared drainage blockages in terraced housing", "Surface water issues near the River Brain"],
      process: "Braintree's varied property types demand flexible approaches. We assess each situation individually, considering property age, pipe material, and the area's specific environmental factors before selecting our clearing method.",
      localTip: "Braintree properties in Bocking and near the River Brain should have drainage inspected regularly, as riverside tree roots and fluctuating water table levels affect pipe integrity throughout the year."
    },
    "drain-unblocking": {
      intro: "From emergency callouts at Freeport Braintree to routine unblocking in Bocking, our Braintree drain unblocking service covers every eventuality. We understand the varied property stock across the town and bring the right equipment to handle Victorian clay pipes and modern plastic systems alike.",
      commonProblems: ["Kitchen waste accumulation in domestic properties", "Bathroom drain blockages in family homes", "External gulley blockages from garden debris", "Toilet blockages from inappropriate flushing", "Fat and grease buildup in commercial premises"],
      process: "Our Braintree engineers carry comprehensive unblocking equipment including flexible rods, electromechanical machines, and water jetting units. We select the appropriate tool for each blockage type and clear your drains with minimal disruption.",
      localTip: "Braintree's newer developments at Great Notley and Panfield Lane may experience blockages from wet wipes and sanitary products more commonly than root-related issues seen in older parts of town."
    },
    "cctv-drain-surveys": {
      intro: "Whether you're purchasing a period property in Bocking or investigating drainage issues in a Great Notley home, our CCTV drain surveys provide the answers you need. High-definition cameras reveal the true condition of underground pipes, helping you make informed decisions about your Braintree property.",
      commonProblems: ["Unknown pipe routes in older properties", "Condition assessment for property purchases", "Investigation of recurring blockage causes", "Insurance claim documentation", "Planning for extensions or renovations"],
      process: "Our survey technicians access your drainage system through manholes or inspection chambers, then guide the camera through the entire pipe network. The real-time footage is recorded and compiled into a comprehensive report for your records.",
      localTip: "Braintree properties built on former agricultural land at Great Notley may have unexpected field drain connections. A CCTV survey identifies these before they cause problems."
    },
    "drain-jetting": {
      intro: "High-pressure jetting is the most effective method for drain cleaning across Braintree, equally effective on Victorian clay pipes in the town centre and modern systems in newer developments. Our specialist equipment removes years of accumulated deposits, restoring your drainage to optimal flow capacity.",
      commonProblems: ["Grease accumulation in commercial kitchens around the town centre", "Scale deposits from Essex hard water", "Silt and sediment in surface water drains", "Root fragments after removal treatments", "General maintenance cleaning for all property types"],
      process: "We select the appropriate jetting nozzle and pressure setting for your pipe type and the deposits being removed. The jetting process works upstream from the blockage point, ensuring debris is flushed towards the sewer rather than further into your system.",
      localTip: "Braintree's restaurants and takeaways in the town centre should schedule regular jetting to prevent grease-related emergency callouts and maintain efficient drainage."
    },
    "emergency-drain-services": {
      intro: "Drainage emergencies across Braintree receive our immediate attention, with engineers ready to respond rapidly to properties from the town centre to Great Notley. Sewage backups, flooding, and overflowing drains are all handled swiftly and professionally, minimising damage and disruption.",
      commonProblems: ["Sewage backing up through toilets and sinks", "Surface water flooding during heavy rainfall", "Manhole overflows affecting multiple properties", "Drain collapses causing ground instability", "Foul odours indicating pipe damage"],
      process: "Emergency calls are prioritised and dispatched to our nearest available engineer. We provide estimated arrival times and keep you informed throughout. On arrival, we secure the area, diagnose the problem, and implement the fastest effective solution.",
      localTip: "Braintree properties near the River Brain should have emergency drainage contacts readily available, particularly during periods of heavy rainfall when the river level rises and puts back pressure on drainage systems."
    },
    "drain-repairs": {
      intro: "Braintree's diverse building stock requires drainage repair expertise spanning several generations of construction. Our repair teams handle everything from relining Victorian clay pipes in Bocking to replacing damaged plastic sections in newer developments, always using materials and methods suited to your specific property.",
      commonProblems: ["Cracked clay pipes in older town centre properties", "Joint displacement from London Clay ground movement", "Root damage requiring pipe replacement", "Deterioration in mid-century pipe materials", "Damage from construction and utility works"],
      process: "Following CCTV diagnosis, we recommend the most appropriate repair approach. No-dig relining is ideal for accessible cracks and joints, while excavation may be necessary for collapsed sections. We always restore surfaces to their original condition.",
      localTip: "Braintree's heavy clay soil means pipe repairs should account for ongoing ground movement. We recommend repair methods that provide long-term flexibility rather than rigid solutions."
    }
  },
  maldon: {
    "blocked-drains": {
      intro: "Maldon's unique position at the head of the Blackwater Estuary, combined with its mix of historic and modern housing, creates distinctive drainage challenges. Our Maldon blocked drain specialists understand how tidal influences and river levels affect drainage systems, from the traditional cottages near Hythe Quay to modern housing developments in Heybridge.",
      commonProblems: ["Silt and sediment accumulation from estuary proximity", "Root intrusion from mature trees in established gardens", "Fat and grease from domestic kitchens", "Tidal back-pressure affecting low-lying properties", "Blockages in shared Victorian drainage near the High Street"],
      process: "We assess your Maldon property's position relative to the Blackwater Estuary and the River Chelmer before selecting clearing methods. Low-lying properties may require different approaches than those on higher ground. Our engineers are experienced with all Maldon property types and tidal drainage considerations.",
      localTip: "Maldon properties near Hythe Quay and the lower slopes of the town should ensure external drains have non-return valves fitted to prevent tidal back-flow, particularly during spring tides combined with heavy rainfall."
    },
    "drain-unblocking": {
      intro: "When drains block in Maldon, our local teams respond quickly with the expertise your situation demands. Whether you're dealing with a backed-up drain on the High Street or an overflowing external gulley in Heybridge, we'll have your drainage flowing freely again.",
      commonProblems: ["Kitchen waste accumulation", "Bathroom drain blockages", "External gulley obstructions from leaves and debris", "Toilet blockages", "Shared drainage issues in period properties"],
      process: "Our Maldon engineers arrive with comprehensive unblocking equipment suitable for all drain types. We assess the blockage location and severity, then apply the most effective clearing technique, ensuring complete removal of the obstruction.",
      localTip: "Maldon's historic High Street properties often have rear drainage running through neighbouring land. Know your drainage easements and shared responsibilities to avoid disputes."
    },
    "cctv-drain-surveys": {
      intro: "Maldon's architectural variety, from traditional weatherboard cottages to modern housing, means drainage systems vary significantly. Our CCTV surveys reveal exactly what's inside your pipes, providing invaluable information for property purchasers, sellers, and homeowners investigating persistent drainage problems in this estuary-side town.",
      commonProblems: ["Age-related pipe deterioration in older properties", "Root ingress from garden vegetation", "Ground movement affecting joints", "Tidal influence on drainage infrastructure", "Condition assessment for property transactions"],
      process: "We survey your entire drainage system, documenting condition, identifying defects, and noting any areas requiring attention. The final report includes annotated footage, a condition summary, and maintenance recommendations specific to your property and its proximity to the estuary.",
      localTip: "Purchasing property in Maldon's older streets near the High Street or All Saints Church? A CCTV survey can reveal century-old drainage that may need specialist attention."
    },
    "drain-jetting": {
      intro: "High-pressure jetting provides the deep cleaning that Maldon's varied drainage systems often need. From clearing silt deposits in waterside properties to routine maintenance for Heybridge estates, our jetting service restores optimal drainage performance across the district.",
      commonProblems: ["Silt and mineral deposits from estuary proximity", "Grease buildup in residential and commercial drains", "Scale deposits from hard water supply", "Root fragments after removal treatments", "General maintenance cleaning"],
      process: "We select jetting equipment and settings appropriate for your pipe material and the deposits being removed. The process is controlled and methodical, ensuring thorough cleaning without risk of damage to your drainage system.",
      localTip: "Maldon properties near the estuary benefit from periodic jetting to remove silt and mineral deposits before they restrict flow, especially after tidal surges that can introduce debris into drainage systems."
    },
    "emergency-drain-services": {
      intro: "Drainage emergencies in Maldon receive rapid response from our teams, day or night. From flooded properties near the estuary to sewage issues on the High Street, our engineers are ready to tackle any emergency situation and protect your property from further damage.",
      commonProblems: ["Sewage backflow during high tides", "Garden and property flooding during heavy rain", "Overflowing inspection chambers", "Collapsed drains causing ground instability", "Storm and tidal surge damage to drainage systems"],
      process: "Emergency calls to our Maldon service trigger immediate dispatch. We provide estimated arrival times and arrive prepared for the reported situation. Our priority is containing the emergency, then implementing a lasting solution.",
      localTip: "Maldon properties near the Blackwater Estuary should monitor drainage closely during combined events of heavy rainfall and high spring tides, when the risk of surcharging is highest."
    },
    "drain-repairs": {
      intro: "Maldon's diverse property ages and proximity to tidal waters mean drain repairs must be carefully tailored. Whether you need no-dig relining for a Victorian pipe near the High Street or excavation repairs at a Heybridge property, our repair specialists have the skills and equipment for the job.",
      commonProblems: ["Cracked pipes from ground movement", "Displaced joints in ageing clay drainage", "Root damage requiring intervention", "Saltwater and tidal damage to pipe materials", "Age-related deterioration"],
      process: "Following thorough investigation, we recommend the most cost-effective repair approach. We explain all options clearly, including likely outcomes and any ongoing maintenance requirements. All repairs are guaranteed for your peace of mind.",
      localTip: "Maldon's proximity to tidal waters means repair materials should be selected for salt-resistance. We use marine-grade sealants and corrosion-resistant materials for properties near the estuary."
    }
  },
  brentwood: {
    "blocked-drains": {
      intro: "Brentwood's reputation as one of Essex's most desirable commuter towns comes with distinctive drainage challenges. The area's substantial Victorian and Edwardian properties feature original clay drainage systems, while tree-lined avenues contribute to root intrusion issues. Our Brentwood specialists understand these local factors and deliver effective blocked drain solutions.",
      commonProblems: ["Tree root intrusion from mature avenue trees", "Fat and grease buildup in domestic kitchens", "Debris accumulation in ageing clay pipe systems", "Shared drainage issues in converted period properties", "Surface water blockages from leaf fall in autumn"],
      process: "Every Brentwood blocked drain is unique, and we treat it that way. Our engineers assess the property type and drainage configuration before selecting the most effective clearing method, whether that's rodding, jetting, or mechanical cutting.",
      localTip: "Brentwood's tree-lined streets in Shenfield and Hutton create persistent root intrusion risks. Annual drain inspections are strongly recommended for properties with mature trees within 10 metres of drainage runs."
    },
    "drain-unblocking": {
      intro: "From emergency callouts in Shenfield to routine unblocking in Pilgrims Hatch, our Brentwood drain unblocking service covers every eventuality. We understand the varied property stock across the borough and bring the right equipment to handle Victorian clay pipes and modern plastic systems alike.",
      commonProblems: ["Hair and soap accumulation in bathroom drains", "Food waste blockages in kitchen sinks", "External gully blockages from garden debris", "Toilet blockages from inappropriate flushing", "Fat buildup in large detached properties with long drainage runs"],
      process: "Our Brentwood engineers carry comprehensive unblocking equipment including flexible rods, electromechanical machines, and water jetting units. We select the appropriate tool for each blockage type and clear your drains with minimal disruption.",
      localTip: "Brentwood's larger detached properties in Shenfield and Hutton often have longer drainage runs that can accumulate debris. Regular maintenance prevents minor slowdowns from becoming full blockages."
    },
    "cctv-drain-surveys": {
      intro: "Whether you're purchasing a period property on Brentwood High Street or investigating drainage issues in a Shenfield family home, our CCTV drain surveys provide the answers you need. High-definition cameras reveal the true condition of underground pipes, helping you make informed decisions about your Brentwood property.",
      commonProblems: ["Unknown pipe routes in period properties", "Condition assessment for property purchases in this competitive market", "Investigation of recurring blockage causes", "Insurance claim documentation", "Planning for extensions or renovations"],
      process: "Our survey technicians access your drainage system through manholes or inspection chambers, then guide the camera through the entire pipe network. The real-time footage is recorded and compiled into a comprehensive report for your records.",
      localTip: "Brentwood home sellers can benefit from proactive drainage surveys, addressing any issues before they become negotiating points in what is Essex's most competitive property market."
    },
    "drain-jetting": {
      intro: "High-pressure jetting is the gold standard for drain cleaning in Brentwood, equally effective on Victorian clay pipes in period properties and modern systems in newer developments. Our specialist equipment removes years of accumulated deposits, restoring your drainage to optimal flow capacity.",
      commonProblems: ["Grease accumulation in large family kitchens", "Scale deposits from Essex hard water", "Silt and sediment in surface water drains", "Root fragments after removal treatments", "General maintenance cleaning for all property types"],
      process: "We select the appropriate jetting nozzle and pressure setting for your pipe type and the deposits being removed. The jetting process works upstream from the blockage point, ensuring debris is flushed towards the sewer rather than further into your system.",
      localTip: "Brentwood's larger properties with extensive drainage runs benefit from annual jetting to maintain flow and prevent the gradual buildup that leads to emergency blockages."
    },
    "emergency-drain-services": {
      intro: "Drainage emergencies across Brentwood receive our immediate attention, with engineers ready to respond rapidly to properties from the High Street to Shenfield, Hutton, and Pilgrims Hatch. Sewage backups, flooding, and overflowing drains are all handled swiftly and professionally.",
      commonProblems: ["Sewage backing up through toilets and sinks", "Surface water flooding during heavy rainfall", "Manhole overflows in residential streets", "Drain collapses causing ground instability", "Tree root collapses causing sudden blockages"],
      process: "Emergency calls are prioritised and dispatched to our nearest Brentwood engineer. We provide estimated arrival times and keep you informed throughout. On arrival, we secure the area, diagnose the problem, and implement the fastest effective solution.",
      localTip: "Brentwood's position on elevated ground means good natural drainage gradients, but when blockages occur they can cause sudden and severe backups. Don't delay calling for help."
    },
    "drain-repairs": {
      intro: "Brentwood's diverse building stock requires drainage repair expertise spanning more than a century of construction techniques. Our repair teams handle everything from relining Victorian clay pipes in period properties to replacing damaged sections in modern developments, always using materials and methods suited to your specific property.",
      commonProblems: ["Cracked clay pipes from London Clay ground movement", "Joint displacement from mature tree root growth", "Root damage requiring pipe replacement", "Deterioration in original Victorian and Edwardian drainage", "Damage from construction and utility works"],
      process: "Following CCTV diagnosis, we recommend the most appropriate repair approach. No-dig relining is ideal for accessible cracks and joints, while excavation may be necessary for collapsed sections. We always restore surfaces to their original condition.",
      localTip: "Brentwood's sandy soil conditions in some areas can make traditional excavation repairs more straightforward than in heavy clay locations, but pipe bedding must be done carefully to prevent future settlement."
    }
  },
  billericay: {
    "blocked-drains": {
      intro: "Billericay's attractive period cottages in the old town centre, 1930s housing stock, and modern developments on the outskirts all present different drainage challenges. Our Billericay blocked drain specialists understand how the London Clay geology and mature trees affect drainage systems across the town.",
      commonProblems: ["Tree root intrusion from mature garden trees", "Fat and grease buildup in domestic kitchens", "Debris in ageing clay pipe systems in the old town", "Wet wipe blockages in modern housing", "Ground movement cracking clay pipe joints"],
      process: "We assess each Billericay property individually, considering its age, pipe material, and the local environmental factors before selecting the most effective clearing method. Our approach is thorough and designed to prevent repeat callouts.",
      localTip: "Billericay properties with mature gardens near Lake Meadows and Norsey Wood face higher root intrusion risks. A proactive annual CCTV check can catch root growth before it causes a full blockage."
    },
    "drain-unblocking": {
      intro: "When drains block in Billericay, our local engineers respond quickly. Whether it's a backed-up kitchen sink near Sun Corner or an overflowing manhole in a modern estate, we bring the right equipment and expertise to clear the problem efficiently.",
      commonProblems: ["Kitchen waste and grease accumulation", "Bathroom drain blockages", "External drain obstructions", "Toilet blockages from inappropriate flushing", "Shared drainage problems in terraced sections of the old town"],
      process: "Our Billericay engineers carry comprehensive unblocking equipment for all drain types. We diagnose the blockage location and severity, then apply the most effective clearing technique for a lasting result.",
      localTip: "Billericay's older properties around the High Street often have complex drainage layouts modified over decades. If blockages recur, a full CCTV survey can map the system and identify the underlying cause."
    },
    "cctv-drain-surveys": {
      intro: "Billericay's range of property ages means drainage systems vary widely. Our CCTV drain surveys provide detailed footage of pipe conditions, essential for property purchasers, homeowners investigating recurring problems, and anyone planning building work that may affect drainage.",
      commonProblems: ["Age-related deterioration in older drainage", "Root ingress from mature garden trees", "Clay ground movement affecting pipe joints", "Unknown connections and modifications", "Pre-purchase condition assessment"],
      process: "We access your drainage system through manholes or inspection chambers and guide our high-definition camera through the entire network. You receive a comprehensive report with footage, defect annotations, and practical recommendations.",
      localTip: "Planning an extension or loft conversion in Billericay? A CCTV survey before building work confirms your drainage can handle increased capacity and identifies any repairs needed first."
    },
    "drain-jetting": {
      intro: "High-pressure jetting delivers the thorough cleaning that Billericay's drainage systems need. Whether clearing stubborn grease in an old town property or maintaining a modern system, our equipment removes deposits and restores full flow capacity.",
      commonProblems: ["Grease and fat buildup", "Hard water scale deposits", "Compacted debris and sediment", "Root fragments after clearing", "Preventative maintenance cleaning"],
      process: "We match jetting pressure and nozzle type to your pipe material and condition, ensuring effective cleaning without risk of damage. The process is thorough and restores your drainage to peak performance.",
      localTip: "Billericay homes with large kitchens and family cooking habits benefit from annual jetting to prevent the gradual grease buildup that is the most common cause of kitchen drain blockages."
    },
    "emergency-drain-services": {
      intro: "Drainage emergencies in Billericay receive our immediate attention. From flooding in properties near Lake Meadows to sewage backups in the town centre, our engineers respond rapidly day and night to protect your property from damage.",
      commonProblems: ["Sewage backing up into the property", "Garden flooding from blocked drainage", "Overflowing manholes", "Sudden drain collapses", "Foul odours indicating serious problems"],
      process: "Emergency calls are prioritised and dispatched immediately. We arrive prepared for the reported situation, contain the emergency first, then implement a lasting repair to prevent recurrence.",
      localTip: "If multiple fixtures are affected simultaneously in your Billericay property, the blockage is likely in the main drain run. Stop using water immediately and call us for emergency assistance."
    },
    "drain-repairs": {
      intro: "Billericay's wide range of property ages requires versatile repair expertise. From relining cracked clay pipes in period cottages to replacing damaged sections in modern estates, our repair specialists select the most appropriate and cost-effective method for every situation.",
      commonProblems: ["Cracked clay pipes from ground movement", "Displaced joints from root pressure", "Deterioration of original drainage materials", "Root damage requiring replacement", "Damage from construction works"],
      process: "We diagnose with CCTV, then recommend the best repair approach. No-dig relining suits most cracks and joint problems, while excavation is reserved for severe collapses. We always restore surfaces properly after any groundwork.",
      localTip: "Billericay's London Clay geology means ground movement is constant. We recommend repair methods that accommodate minor seasonal movement rather than rigid solutions that may crack again."
    }
  },
  ingatestone: {
    "blocked-drains": {
      intro: "Ingatestone's character as a historic Essex village brings distinctive drainage challenges. From period properties along the High Street with original clay drainage to rural homes with private septic systems, our Ingatestone specialists handle all types of blocked drains with local knowledge and professional equipment.",
      commonProblems: ["Root intrusion in clay pipes near mature village trees", "Fat and grease buildup in domestic drains", "Septic tank and treatment plant blockages", "Debris in older drainage systems along the High Street", "Surface water drainage issues in rural properties"],
      process: "We assess each Ingatestone property individually, considering whether it's mains-connected or has private drainage, the pipe materials, and the local ground conditions. Our approach ensures the right solution for village properties.",
      localTip: "Ingatestone properties with private septic tanks should have them emptied and inspected at least annually. The London Clay soil makes soakaways less effective, and waterlogged systems are a common cause of drainage backup in the village."
    },
    "drain-unblocking": {
      intro: "When drains block in Ingatestone, our engineers respond promptly with equipment suitable for both mains drainage and private systems. Whether it's a household drain near the High Street or a rural property's treatment plant, we clear the problem efficiently.",
      commonProblems: ["Kitchen waste accumulation", "Bathroom drain blockages", "External drain obstructions from rural debris", "Septic tank inlet blockages", "Shared drainage issues in village properties"],
      process: "Our engineers carry equipment for all drainage types, including specialist tools for private systems. We assess the situation, select the appropriate clearing method, and ensure your drainage is fully functional before leaving.",
      localTip: "Ingatestone's semi-rural setting means some properties have long external drainage runs. Know where your manholes and inspection chambers are located to speed up diagnosis."
    },
    "cctv-drain-surveys": {
      intro: "Ingatestone's mix of historic and modern properties, combined with both mains and private drainage systems, makes CCTV surveys particularly valuable. Our cameras reveal the true condition of underground pipes and help identify problems before they become emergencies.",
      commonProblems: ["Unknown drainage routes in older village properties", "Condition assessment for property purchases", "Investigation of persistent problems in private systems", "Mapping drainage for building regulation compliance", "Identifying connections between private and public systems"],
      process: "We survey your drainage system thoroughly, whether mains-connected or private. The detailed report helps you understand your system's condition and plan any maintenance or repairs needed.",
      localTip: "Buying a rural property near Ingatestone? A CCTV survey combined with a septic tank inspection can prevent costly surprises after purchase."
    },
    "drain-jetting": {
      intro: "High-pressure jetting effectively cleans both mains drainage and private systems in Ingatestone. Our equipment is adjustable for different pipe types and conditions, ensuring thorough cleaning that extends the life of your drainage system.",
      commonProblems: ["Grease and organic matter buildup", "Scale deposits", "Root fragments after clearing treatments", "Silt in surface water systems", "Maintenance cleaning for private treatment plants"],
      process: "We adjust jetting pressure and nozzle selection to suit your system, whether it's mains-connected clay pipes or a private treatment plant's inlet pipework. The result is thoroughly cleaned drainage with restored flow capacity.",
      localTip: "Ingatestone properties with private drainage benefit from annual jetting of inlet pipes to their septic tanks or treatment plants, preventing the buildup that causes costly system failures."
    },
    "emergency-drain-services": {
      intro: "Drainage emergencies in Ingatestone receive rapid response from our team, whether the problem is with mains drainage or a private system. Sewage backups, flooding, and overflowing tanks are all handled quickly and professionally.",
      commonProblems: ["Sewage backing up from blocked private systems", "Flooding from overwhelmed drainage", "Overflowing septic tanks", "Collapsed drains in rural locations", "Foul odours from failing treatment plants"],
      process: "Emergency calls trigger immediate dispatch. We arrive with equipment for both mains and private drainage systems and work to contain and resolve the emergency as quickly as possible.",
      localTip: "Ingatestone's rural properties should know the location of their septic tank, soakaway, and any inspection chambers. This information is critical for a fast emergency response."
    },
    "drain-repairs": {
      intro: "Ingatestone's property range from Tudor-era homes to modern developments requires versatile repair expertise. We handle repairs to mains drainage, private pipe systems, and septic tank installations, always selecting the most appropriate method for the property and situation.",
      commonProblems: ["Cracked clay pipes in village properties", "Displaced joints from ground movement", "Deterioration of private drainage systems", "Soakaway failure in clay soil", "Root damage to drainage near mature trees"],
      process: "We diagnose the problem with CCTV and specialist equipment, then recommend the most cost-effective repair. For private systems, we can advise on upgrades to treatment plants that may improve long-term reliability.",
      localTip: "Ingatestone's London Clay can cause soakaway fields to become waterlogged. If your septic system is struggling, we can assess whether a raised mound system or treatment plant upgrade would solve the problem."
    }
  },
  "great-baddow": {
    "blocked-drains": {
      intro: "Great Baddow's extensive residential development from the 1950s to the present day means a range of drainage systems of different ages and materials. Our Great Baddow blocked drain specialists understand how ageing pitch fibre and clay pipes, combined with Essex clay ground movement, create the area's most common drainage problems.",
      commonProblems: ["Root intrusion through cracked joints in mature gardens", "Pitch fibre pipe deformation in 1960s-70s housing", "Fat and grease buildup in domestic kitchens", "Clay pipe displacement from ground movement", "Debris accumulation in ageing systems approaching end of life"],
      process: "We assess your Great Baddow property's drainage age and material before selecting the most effective clearing method. Pitch fibre pipes require particularly careful handling to avoid worsening any existing deformation.",
      localTip: "Great Baddow properties built in the 1960s and 70s along Meadgate Avenue and Longmead Avenue may have pitch fibre drainage that is increasingly prone to deformation. A CCTV survey can confirm pipe condition before problems develop."
    },
    "drain-unblocking": {
      intro: "When drains block in Great Baddow, our local teams respond quickly with equipment suited to the area's mix of drainage ages. From ageing clay pipes in properties along Baddow Road to modern systems in newer developments, we clear blockages efficiently.",
      commonProblems: ["Kitchen waste accumulation", "Bathroom drain blockages from hair and soap", "External drain obstructions", "Toilet blockages", "Shared drainage issues in semi-detached properties"],
      process: "Our Great Baddow engineers carry comprehensive unblocking equipment. We diagnose the blockage, taking into account the pipe material and age, then apply the most effective clearing technique for a lasting result.",
      localTip: "Great Baddow's 1960s-70s properties often have shallow external drainage that can be affected by garden activities. Take care when digging or landscaping near drain runs."
    },
    "cctv-drain-surveys": {
      intro: "Great Baddow's mix of mid-century and modern housing means drainage systems vary in age, material, and condition. Our CCTV surveys are particularly valuable here, revealing the condition of ageing pitch fibre and clay pipes that may be approaching the end of their service life.",
      commonProblems: ["Pitch fibre pipe deformation assessment", "Root ingress through cracked clay joints", "Ground movement damage to pipe alignment", "Condition survey for insurance or sale purposes", "Pre-extension drainage capacity checks"],
      process: "We survey your entire drainage system, paying particular attention to pipe material condition. For pitch fibre systems, we assess the degree of deformation and advise on likely remaining service life and repair options.",
      localTip: "If you're buying a 1960s or 70s property in Great Baddow, always request a CCTV drain survey. Pitch fibre pipes from this era are increasingly failing and replacement costs can be significant."
    },
    "drain-jetting": {
      intro: "High-pressure jetting effectively cleans Great Baddow's varied drainage systems, but requires careful pressure management for older pitch fibre pipes. Our experienced engineers adjust their approach to suit your specific pipe material and condition.",
      commonProblems: ["Grease buildup in kitchen waste pipes", "Scale deposits from Essex hard water", "Root fragment removal", "Sediment in surface water systems", "Maintenance cleaning for ageing pipe networks"],
      process: "We select jetting pressure and nozzle type based on your pipe material. Pitch fibre pipes receive lower pressure settings to avoid exacerbating any deformation, while clay and plastic pipes can be cleaned at higher pressures for maximum effect.",
      localTip: "Great Baddow properties with pitch fibre drainage should use jetting at reduced pressure. Our engineers know the right settings to clean effectively without damaging vulnerable pipe materials."
    },
    "emergency-drain-services": {
      intro: "Drainage emergencies in Great Baddow receive rapid response from our locally positioned teams. From flooding in established residential streets to sewage backups in newer developments, our engineers tackle any emergency to protect your property.",
      commonProblems: ["Sewage backing up from collapsed pitch fibre pipes", "Garden flooding from blocked drainage", "Overflowing manholes during heavy rain", "Sudden pipe failures in ageing systems", "Foul odours from compromised drainage"],
      process: "Emergency calls trigger immediate dispatch. We arrive prepared for the situation, contain the emergency, and implement the most effective solution for the pipe type and damage encountered.",
      localTip: "If you notice the ground sinking along a drainage run in your Great Baddow garden, call us before it becomes an emergency. This often indicates a pipe collapse developing beneath the surface."
    },
    "drain-repairs": {
      intro: "Great Baddow's ageing drainage stock means repair work is increasingly common. Our repair specialists are experienced with all pipe materials found in the area, including the pitch fibre systems from the 1960s-70s that require specialist repair techniques.",
      commonProblems: ["Pitch fibre pipe deformation requiring relining or replacement", "Cracked clay pipes from ground movement", "Displaced joints from root pressure", "Complete pipe collapses in ageing systems", "Connection failures where different pipe materials meet"],
      process: "We diagnose with CCTV, then recommend the best repair approach for your pipe material. For pitch fibre, structural relining can restore pipes without excavation. For clay pipes, we offer both relining and targeted excavation depending on damage severity.",
      localTip: "Great Baddow properties with failing pitch fibre drainage can be relined without digging up gardens and patios. This no-dig approach saves significantly on cost and disruption compared to full excavation."
    }
  },
  springfield: {
    "blocked-drains": {
      intro: "Springfield's dramatic growth from a village to one of Chelmsford's largest suburbs means its drainage systems span multiple decades of construction. From the modern sustainable drainage at Beaulieu Park to the established systems in Chelmer Village, our Springfield specialists handle blocked drains across the full range of property types.",
      commonProblems: ["Wet wipe blockages in modern housing at Beaulieu Park", "Root intrusion in established gardens near Springfield Road", "Fat and grease buildup in domestic kitchens", "Debris accumulation in 1970s-80s pipe systems at Chelmer Village", "Surface water issues near the River Chelmer"],
      process: "We assess your Springfield property's drainage age and design before selecting the most effective method. Modern systems with sustainable drainage features require different approaches than older conventional drainage.",
      localTip: "Springfield's newer homes at Beaulieu Park have modern drainage, but blockages from wet wipes, sanitary products, and cooking fat are still common. Only flush the three Ps: pee, poo, and paper."
    },
    "drain-unblocking": {
      intro: "When drains block in Springfield, our engineers respond quickly with equipment suited to the area's diverse housing stock. From Chelmer Village apartments to Beaulieu Park family homes, we clear blockages efficiently and with minimal disruption.",
      commonProblems: ["Kitchen waste and grease accumulation", "Bathroom drain blockages in family homes", "External gulley blockages", "Shared drainage problems in flatted developments", "Toilet blockages from inappropriate flushing"],
      process: "Our Springfield engineers carry comprehensive unblocking equipment for all system types. We diagnose the blockage, select the appropriate clearing method, and ensure your drainage is fully restored before we leave.",
      localTip: "Springfield's Chelmer Village flats often share drainage with neighbouring properties. If your neighbour is also experiencing slow drainage, the blockage may be in a shared section that requires professional clearing."
    },
    "cctv-drain-surveys": {
      intro: "Springfield's range of property ages from the 1970s to brand new makes CCTV surveys valuable for understanding drainage condition. Whether you're investigating recurring problems in a Chelmer Village property or confirming the as-built drainage in a new Beaulieu Park home, our surveys provide clear answers.",
      commonProblems: ["Ageing pipe condition in established parts of Springfield", "Root ingress in mature gardens", "Confirming drainage layouts for extensions or renovations", "Pre-purchase surveys for property buyers", "Investigating shared drainage responsibilities"],
      process: "We survey your drainage system from manhole to sewer connection, recording HD footage and documenting all findings. The comprehensive report includes defect locations, condition ratings, and practical recommendations.",
      localTip: "Springfield property buyers should request a CCTV survey regardless of property age. Even newer homes can have construction defects or settling-related damage that a visual survey would never reveal."
    },
    "drain-jetting": {
      intro: "High-pressure jetting keeps Springfield's varied drainage systems performing at their best. From deep-cleaning established pipes at Chelmer Village to maintenance jetting at Beaulieu Park, our service restores and maintains optimal flow throughout the area.",
      commonProblems: ["Grease accumulation in kitchen drains", "Scale buildup from Essex hard water", "Sediment in surface water systems near the River Chelmer", "Root fragments after clearing", "Post-construction debris in newer systems"],
      process: "We match jetting pressure and nozzle type to your pipe material and condition. Modern plastic pipes receive different treatment than older clay or concrete systems, ensuring effective cleaning without any risk of damage.",
      localTip: "Springfield properties near the River Chelmer should consider bi-annual jetting to prevent silt buildup from elevated groundwater that can deposit fine material in drainage systems during wet winters."
    },
    "emergency-drain-services": {
      intro: "Drainage emergencies across Springfield receive our immediate attention, day or night. From flooding near the River Chelmer to sewage backups in residential streets, our engineers respond rapidly to contain damage and resolve the problem.",
      commonProblems: ["Sewage backing up into properties", "Flooding from blocked surface drainage", "Overflowing manholes during heavy rainfall", "Collapsed drains in established areas", "Shared drainage failures in flatted developments"],
      process: "Emergency calls are prioritised immediately. We dispatch the nearest available engineer with full equipment and provide arrival estimates. On site, we contain the emergency first, then implement a lasting solution.",
      localTip: "Springfield's proximity to the River Chelmer means some properties are at risk of combined flooding during heavy rain and high river levels. Keep emergency drainage contacts readily available during wet weather."
    },
    "drain-repairs": {
      intro: "Springfield's range of drainage ages from the 1970s to present day means repairs must be tailored to specific pipe materials and conditions. Our repair specialists handle everything from relining ageing concrete pipes at Chelmer Village to fixing settling-related damage in newer Beaulieu Park developments.",
      commonProblems: ["Cracked concrete pipes in 1970s-80s housing", "Joint displacement from ground movement", "Root damage in established gardens", "Settling-related damage in newer developments", "Connection failures between old and new drainage"],
      process: "We diagnose with CCTV, then recommend the best repair approach. No-dig relining works well for most accessible defects, while targeted excavation is reserved for severe collapses or situations where relining isn't suitable.",
      localTip: "Springfield properties where new development drainage connects to older trunk sewers can experience problems at the junction. If you have recurring issues, the connection point is often the culprit."
    }
  }
};

/**
 * Generate service content for a given location slug and service slug.
 */
export function getLocationServiceContent(locationSlug: string, serviceSlug: string): ServiceContent | undefined {
  return LOCATION_SERVICE_CONTENT[locationSlug]?.[serviceSlug];
}

/**
 * Get location data by slug.
 */
export function getLocationData(locationSlug: string): LocationData | undefined {
  return LOCATION_DATA[locationSlug];
}

/**
 * Shared trust signals used across all location + service pages
 */
export const TRUST_SIGNALS = [
  "No call-out fees — you only pay for the work completed",
  "24/7 emergency response across Chelmsford and surrounding areas",
  "Fixed-price quotes confirmed before any work begins",
  "Fully qualified, DBS-checked, and insured engineers",
  "CCTV cameras, jetting equipment, and repair materials carried on every van",
  "Experienced with all property types and drainage systems across Essex"
];

/**
 * FAQ templates that are personalised with location and service details
 */
export const LOCATION_SERVICE_FAQS = [
  {
    question: "How quickly can you reach {location} for a {service} callout?",
    answer: "Our engineers are based across Chelmsford and surrounding areas and typically reach {location} {responseTime}. For urgent blockages causing flooding or sewage backup, we prioritise dispatch to minimise property damage."
  },
  {
    question: "What does {service} cost in {location}?",
    answer: "We provide a fixed-price quote before starting work, so you know exactly what you're paying. Costs depend on access, blockage severity, and the method required. We never charge call-out fees and there are no hidden charges."
  },
  {
    question: "Do you charge extra for evenings and weekends in {location}?",
    answer: "No. We never charge a call-out fee for drain unblocking in {location} or anywhere else across Chelmsford and surrounding areas. You only pay for the work carried out, and we confirm the price before we start."
  },
  {
    question: "What equipment do you use for {service}?",
    answer: "Our engineers carry professional-grade equipment including CCTV drain cameras, high-pressure jetting machines (up to 4,000 PSI), electromechanical drain cleaning machines, and a full range of repair materials. This means most problems can be diagnosed and resolved in a single visit."
  },
  {
    question: "Are your engineers qualified and insured?",
    answer: "Yes. All our drainage engineers are fully trained, hold relevant industry qualifications, and carry comprehensive public liability insurance. Every team member is DBS checked and arrives in a clearly branded uniform with a fully equipped van."
  },
  {
    question: "Can you help with an emergency drainage problem in {location}?",
    answer: "Our emergency teams are positioned across Chelmsford and surrounding areas and reach {location} {responseTime}. We operate around the clock — 24 hours a day, 7 days a week, including bank holidays — so help is available whenever you need it."
  }
];
