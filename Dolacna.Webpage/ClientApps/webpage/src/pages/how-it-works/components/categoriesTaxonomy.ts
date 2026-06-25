/**
 * Canonical product-category taxonomy used on the "Categories" how-it-works
 * page. Subcategory names are the Slovak source values from the app's database
 * (single source of truth). The localized *main* category name is resolved via
 * i18n using `key` (see `categoriesPage.categoryList.names`).
 *
 * Each main category groups its subcategories into named subgroups (matching
 * the app's `parent_id` groups). Subgroup names marked below with `(inferred)`
 * were not in the provided parent_id → name mapping and may need adjusting.
 */
export interface CategorySubgroup {
  /** Heading for the smaller list. Omitted when the category is flat. */
  name?: string;
  items: string[];
}

export interface CategoryTaxonomyEntry {
  key: string;
  subgroups: CategorySubgroup[];
}

export const CATEGORY_TAXONOMY: CategoryTaxonomyEntry[] = [
  {
    key: 'meatFish',
    subgroups: [
      {
        name: 'Bravčové',
        items: [
          'Bravčová krkovička',
          'Bravčová panenka',
          'Bravčové karé',
          'Bravčové mleté',
          'Bravčové plece',
          'Bravčové rebrá',
          'Bravčové stehno',
          'Bravčový bôčik',
          'Jaternica (hurka)',
        ],
      },
      {
        name: 'Hovädzie',
        items: [
          'Hovädzia sviečkovica',
          'Hovädzie mleté',
          'Hovädzie stehno',
          'Hovädzí steak',
        ],
      },
      {
        name: 'Kuracie',
        items: [
          'Kuracie krídla',
          'Kuracie prsia',
          'Kuracie stehno',
          'Kuracie štvrte',
          'Kurča celé',
          'Mleté kuracie',
        ],
      },
      {
        name: 'Ryby',
        items: ['Krevety', 'Losos', 'Makrela', 'Pstruh', 'Sushi'],
      },
      {
        name: 'Ostatné mäso', // inferred (parent_id 2 direct items)
        items: [
          'Fašírky',
          'Kačacie mäso',
          'Mleté mäso mix',
          'Morčacie',
          'Sušené mäso (beef jerky)',
        ],
      },
    ],
  },
  {
    key: 'dairyEggs',
    subgroups: [
      {
        name: 'Maslo, vajcia a nátierky', // inferred (parent_id 3 direct items)
        items: [
          'Majonéza',
          'Margarín a Palmarín',
          'Maslo',
          'Nátierky',
          'Smotanová nátierka',
          'Tatarská omáčka',
          'Vajcia',
        ],
      },
      {
        name: 'Jogurty a mliečne dezerty', // inferred (parent_id 21)
        items: [
          'Jogurt biely',
          'Jogurt grécky',
          'Jogurt ochutený',
          'Jogurt smotanový',
          'Mliečna ryža',
          'Proteínový puding',
          'Puding',
          'Skyr',
          'Termix',
        ],
      },
      {
        name: 'Mlieko a mliečne nápoje',
        items: [
          'Acidofilné mlieko (acidko)',
          'Bezlaktózové mlieko',
          'Jogurtové nápoje',
          'Kefírové mlieko',
          'Kokosové mlieko',
          'Mandľové mlieko',
          'Mliečne tyčinky a rezy',
          'Mliečné nápoje',
          'Ochutené (sladené mlieko)',
          'Ovsené mlieko',
          'Plnotučné mlieko 3.5%',
          'Polotučné mlieko 1.5%',
          'Proteínové nápoje',
          'Sójové mlieko',
        ],
      },
      {
        name: 'Tvarohy',
        items: [
          'Tvaroh nízkotučný',
          'Tvaroh ochutený',
          'Tvaroh plnotučný',
          'Tvaroh polotučný',
        ],
      },
      {
        name: 'Syry',
        items: [
          'Balkánsky syr',
          'Brie',
          'Bryndza',
          'Burrata',
          'Cheddar a toastový syr',
          'Cottage cheese',
          'Eidam (Edam)',
          'Emental',
          'Encián (hermelín, camembert)',
          'Feta syr',
          'Gouda',
          'Grana Padano',
          'Halloumi',
          'Leerdammer',
          'Mascarpone',
          'Mozzarella',
          'Nite (korbáčiky)',
          'Niva a Plesnivec',
          'Oštiepok a polooštiepok',
          'Parenica',
          'Parmigiano (parmezán)',
          'Pecorino Romano',
          'Syrokrém',
          'Syrové nite',
          'Talianske syry',
          'Tavený syr',
          'Údený syr',
        ],
      },
      {
        name: 'Smotany',
        items: [
          'Smotana kyslá',
          'Smotana na varenie',
          'Smotana na šľahanie',
          'Šľahačka',
        ],
      },
    ],
  },
  {
    key: 'fruitVeg',
    subgroups: [
      {
        name: 'Ovocie',
        items: [
          'Ananás',
          'Avokádo',
          'Banány',
          'Broskyne',
          'Citróny',
          'Grepy',
          'Hrozno',
          'Hrušky',
          'Jablká',
          'Jahody',
          'Kaki',
          'Kiwi',
          'Maliny',
          'Mandarínky',
          'Mango',
          'Marhule',
          'Melón (dyňa červená)',
          'Nektarinky',
          'Pomaranče',
          'Pomelo',
          'Čerešne',
          'Čučoriedky',
        ],
      },
      {
        name: 'Zelenina',
        items: [
          'Baby špenát',
          'Baklažán',
          'Batáty',
          'Brokolica',
          'Cesnak',
          'Cherry paradajky',
          'Cibuľa',
          'Cuketa',
          'Cvikla',
          'Kaleráb',
          'Kapusta',
          'Karfiol',
          'Kvasená kapusta',
          'Lahôdková cibuľka',
          'Mrkva',
          'Paprika',
          'Paradajky',
          'Petržlen',
          'Pór',
          'Reďkvičky',
          'Rukola',
          'Stopkový zeler',
          'Uhorka',
          'Uhorka šalátová',
          'Zeler',
          'Zemiaky',
          'Zázvor',
          'Šalát',
          'Šalátový mix',
          'Špargla',
        ],
      },
      {
        name: 'Čerstvé bylinky',
        items: [
          'Bazalka čerstvá',
          'Kôpor',
          'Pažítka čerstvá',
          'Petržlenová vňať čerstvá',
        ],
      },
      {
        name: 'Huby',
        items: ['Šampiňóny'],
      },
    ],
  },
  {
    key: 'bakery',
    subgroups: [
      {
        name: 'Chlieb',
        items: ['Chlieb', 'Toastový chlieb'],
      },
      {
        name: 'Pečivo a rožky', // inferred (parent_id 43)
        items: [
          'Bageta',
          'Hamburgrové žemle',
          'Kaiserka',
          'Rožok',
          'Sucháre',
          'Tortilly',
        ],
      },
      {
        name: 'Sladké pečivo',
        items: [
          'Croissant',
          'Donut',
          'Muffin',
          'Taštička',
          'Twister',
          'Vianočka',
          'Závin',
          'Šiška',
        ],
      },
      {
        name: 'Slané pečivo a strúhanka', // inferred (parent_id 6)
        items: ['Slané pečivo', 'Strúhanka', 'Zákusky'],
      },
      {
        name: 'Cestá', // inferred (parent_id 44)
        items: ['Cesto na pizzu', 'Lístkové cesto'],
      },
    ],
  },
  {
    key: 'beverages',
    subgroups: [
      {
        name: 'Vody a minerálky', // inferred (parent_id 53)
        items: [
          'Dojčenská voda',
          'Minerálka jemne perlivá',
          'Minerálka neperlivá',
          'Minerálka ochutená',
          'Minerálka perlivá',
        ],
      },
      {
        name: 'Sladené vody',
        items: [
          'Cola',
          'Hroznový nápoj (Vinea)',
          'Kombucha',
          'Pomarančová limonáda (Fanta, Miranda, Orangina)',
          'Sprite (7 Up)',
          'Tonic',
          'Ľadový čaj',
        ],
      },
      {
        name: 'Džúsy a šťavy', // inferred (parent_id 49)
        items: [
          'Džús jablkový',
          'Džús multivitamín',
          'Džús ovocný',
          'Džús pomarančový',
          'Smoothie',
          'Šťava cviklová',
          'Šťava karotková',
        ],
      },
      {
        name: 'Energetické a funkčné nápoje', // inferred (parent_id 7)
        items: [
          'Energy drinky',
          'Iontový a izotonický nápoj',
          'Kokosová voda',
          'Sirupy',
          'Vitamínová voda',
        ],
      },
      {
        name: 'Káva',
        items: [
          'Instantná káva',
          'Káva kapsule',
          'Kávový nápoj',
          'Mletá káva',
          'Zrnková káva',
        ],
      },
      {
        name: 'Čaje',
        items: [
          'Čaj bylinný',
          'Čaj ovocný',
          'Čaj zelený',
          'Čaj zázvorový',
          'Čaj čierny',
        ],
      },
      {
        name: 'Kakao a instantné nápoje',
        items: ['Granko', 'Kakaový prášok', 'Proteínový prášok', 'Šumienka'],
      },
      {
        name: 'Pivá',
        items: [
          'Pivo 10°',
          'Pivo 11°',
          'Pivo 12°',
          'Pivo 14° a viacstupňové',
          'Pivo craftové (Ale, IPA)',
          'Pivo nealkoholické',
          'Pivo tmavé',
          'Radler',
        ],
      },
      {
        name: 'Vína',
        items: [
          'Biele víno',
          'Prossecco',
          'Ružové víno',
          'Červené víno',
          'Šumivé víno',
        ],
      },
      {
        name: 'Liehoviny',
        items: [
          'Borovička',
          'Brandy a koňak',
          'Gin',
          'Likéry',
          'Ovocný destilát',
          'Rum',
          'Slivovica',
          'Tequilla',
          'Vodka',
          'Whiskey a bourbon',
        ],
      },
    ],
  },
  {
    key: 'pantry',
    subgroups: [
      {
        name: 'Cestoviny',
        items: [
          'Fussili cestoviny',
          'Kolienka cestoviny',
          'Penne cestoviny',
          'Rezance do polievky (niťovky)',
          'Rezance ryžové',
          'Spaghetti cestoviny (Špagety)',
          'Tagliatelle cestoviny',
          'Tarhoňa',
        ],
      },
      {
        name: 'Ryža',
        items: [
          'Ryža Basmati',
          'Ryža dlhozrnná',
          'Ryža gulatozrnná',
          'Ryža jazmínová',
        ],
      },
      {
        name: 'Strukoviny',
        items: ['Cícer', 'Fazuľa', 'Hrach', 'Šošovica'],
      },
      {
        name: 'Ryža, strukoviny a sója',
        items: ['Kuskus', 'Pohánka', 'Sója a náhrady mäsa'],
      },
      {
        name: 'Múka a krupica',
        items: [
          'Krupica',
          'Múka hladká',
          'Múka hrubá',
          'Múka polohrubá',
          'Múka špaldová',
        ],
      },
      {
        name: 'Cukor', // inferred (parent_id 1459)
        items: [
          'Cukor kryštálový a Cukor kockový',
          'Cukor práškový',
          'Cukor trstinový',
          'Vanilínový cukor a Vanilkový cukor',
          'Škoricový cukor',
        ],
      },
      {
        name: 'Pečenie a prísady na varenie',
        items: [
          'Arómy a sladidlá',
          'Droždie',
          'Jedlá sóda a sóda bikarbóna',
          'Kyselina citrónová a Citrodeko',
          'Marinády',
          'Polevy, toppingy, zdobenie a farbivá',
          'Prášok do pečiva, prášok do perníka, prášok na pečenie',
          'Pudingy',
          'Zlatý klas',
          'Škrob',
          'Želé a želatina',
        ],
      },
      {
        name: 'Základné koreniny a bylinky',
        items: [
          'Bazalka drvená',
          'Biele korenie',
          'Bobkový list',
          'Cesnak a cibuľa mletá',
          'Kurkuma',
          'Oregano drvené',
          'Paprika sladká mletá',
          'Paprika štipľavá mletá',
          'Rasca',
          'Zelené korenie',
          'Čierne korenie',
          'Škorica',
        ],
      },
      {
        name: 'Zmesi korenín a korenie mixy',
        items: [
          'Grilovacie korenie',
          'Gulášové korenie',
          'Kari korenie',
          'Korenie bravčové a korenie krkovička',
          'Korenie chilli (Čili) a Korenie Chilli con Carne',
          'Korenie gyros a kebab',
          'Korenie hranolky a korenie batáty',
          'Korenie kura',
          'Korenie na punč a varené víno',
          'Korenie ryby',
          'Korenie zemiaky',
          'Korenie Čína a korenie Ázia',
          'Korenie šalátové',
          'Korenie štvorfarebné, korenie štyroch farieb',
          'Nové korenie',
          'Pizza korenie',
          'Podravka Natur (vegeta)',
          'Provensálske byliny a Talianské byliny',
          'Tekuté ochucovadlo',
        ],
      },
      {
        name: 'Korenie a ochucovadlá',
        items: ['Bujóny', 'Soľ', 'Špeciálne pasty a omáčky'],
      },
      {
        name: 'Oleje',
        items: ['Olivový olej', 'Repkový olej', 'Slnečnicový olej'],
      },
      {
        name: 'Ocot', // inferred (parent_id 864)
        items: ['Balsamico', 'Ocot kvasný', 'Vinný ocot'],
      },
      {
        name: 'Omáčky a pestá',
        items: [
          'Bazalkové pesto',
          'Boloňská omáčka',
          'Paradajková omáčka a paradajkové pesto',
          'Sójová omáčka',
          'Špagetové omáčky (Morca della)',
        ],
      },
      {
        name: 'Dresingy, pestá a omáčky',
        items: ['Chren', 'Dresingy', 'Horčice', 'Kečupy'],
      },
      {
        name: 'Konzervy a zaváraniny', // inferred (parent_id 63)
        items: [
          'Bambusové výhonky',
          'Baranie rohy, feferóny, jalapeňo',
          'Cibuľka zaváraná',
          'Fazuľa v konzerve',
          'Hrášok v konzerve',
          'Huby v konzerve (Šampiňóny v konzerve)',
          'Kukurica v konzerve',
          'Mäso v konzerve',
          'Olivy',
          'Ovocie v konzerve',
          'Paradajkový pretlak, pasírované a krájané paradajky a paradajkové pyré',
          'Paradajky sušené',
          'Ryby v konzerve',
          'Sardinky v konzerve',
          'Tuniak v konzerve',
          'Tuniakové šaláty',
          'Uhorky zavárané',
          'Výživy a detské kaše',
          'Zelenina v konzerve',
          'Čalamáda',
        ],
      },
      {
        name: 'Cereálie a raňajky', // inferred (parent_id 73)
        items: [
          'Cereálie',
          'Cereálna tyčinka, musli tyčinka',
          'Musli',
          'Ovsená kaša',
          'Ovsené vločky a pohánkové vločky',
          'Proteínové tyčinky',
          'Ryžová kaša',
        ],
      },
      {
        name: 'Instantné jedlá', // inferred (parent_id 75)
        items: ['Instantné cestoviny', 'Instantné jedlá', 'Instantné polievky'],
      },
      {
        name: 'Sladkosti',
        items: [
          'Bonboniéry',
          'Cukríky a lízanky',
          'Oblátky',
          'Perníky',
          'Piškóty',
          'Sušienky',
          'Trubičky',
          'Zákusky a rezy',
          'Čokoláda horká',
          'Čokoláda mliečna',
          'Čokoládové cukríky (dražé)',
          'Čokoládové tyčinky',
          'Žuvačky',
        ],
      },
      {
        name: 'Slané',
        items: [
          'Chrumky',
          'Lupienky a chipsy',
          'Popcorn',
          'Snacky a krekry',
          'Tortilla chips a salsy',
          'Tyčinky slané',
        ],
      },
      {
        name: 'Orechy a semienka',
        items: ['Orechy v čokoláde', 'Para orechy'],
      },
      {
        name: 'Orechy', // inferred (parent_id 865)
        items: [
          'Arašidy',
          'Kešu orechy',
          'Lieskové orechy',
          'Mandle',
          'Para',
          'Pistácie',
          'Vlašské orechy',
          'Zmes orechov',
        ],
      },
      {
        name: 'Semienka',
        items: ['Slnečnicové semienka', 'Tekvicové semienka'],
      },
      {
        name: 'Sušené ovocie',
        items: [
          'Hrozienka',
          'Kokos strúhaný a kokosové plátky',
          'Mak',
          'Sušené slivky',
        ],
      },
      {
        name: 'Džemy, medy, sladké nátierky',
        items: ['Med'],
      },
      {
        name: 'Džemy a lekváre',
        items: ['Džem jahoda', 'Džem marhuľa'],
      },
      {
        name: 'Sladké nátierky',
        items: ['Arašiové maslo', 'Javorový sirup', 'Lieskooriešková nátierka'],
      },
    ],
  },
  {
    key: 'frozen',
    subgroups: [
      {
        name: 'Mrazené jedlá a polotovary', // inferred (parent_id 4)
        items: [
          'Bezmäsité mrazené výrobky a hotové jedlá',
          'Kuracie nugetky, nugety, stripsy',
          'Mrazená pizza',
          'Mrazené hranolky a krokety',
          'Mrazené výrobky ostatné',
        ],
      },
      {
        name: 'Mrazené ryby',
        items: ['Rybie filé', 'Rybie prsty'],
      },
      {
        name: 'Mrazená zelenina',
        items: ['Mrazená zeleninová zmes', 'Mrazený špenát'],
      },
      {
        name: 'Mrazené ovocie',
        items: ['Mrazené jahody', 'Mrazené maliny', 'Mrazené čučoriedky'],
      },
      {
        name: 'Zmrzlina',
        items: [
          'Kornútiky',
          'Mix nanukov',
          'Ovocný nanuk',
          'Ruská zmrzlina',
          'Smotanový nanuk',
          'Sorbet',
          'Tvarohový nanuk',
          'Zmrzlina jahodová',
          'Zmrzlina keks',
          'Zmrzlina pistáciová',
          'Zmrzlina straciatellová',
          'Zmrzlina vanilková',
          'Zmrzlina čokoládová',
        ],
      },
    ],
  },
  {
    key: 'vegan',
    subgroups: [
      {
        items: ['Hummus', 'Rastlinné nátierky', 'Tofu a tempeh'],
      },
    ],
  },
  {
    key: 'deli',
    subgroups: [
      {
        name: 'Klobásy a lahôdky', // inferred (parent_id 10 direct items)
        items: [
          'Grilovacie klobásky',
          'Klobásy',
          'Lahôdkové šaláty',
          'Masť',
          'Paštéty',
          'Rybie špeciality',
          'Treska',
          'Špekačky',
        ],
      },
      {
        name: 'Šunky',
        items: [
          'Bravčová šunka',
          'Jamón',
          'Kuracia šunka',
          'Morčacia šunka',
          'Prosciutto',
          'Schwarzwaldská (Švarcvaldská)',
        ],
      },
      {
        name: 'Salámy',
        items: [
          'Jemná saláma',
          'Kabanos',
          'Lovecká saláma',
          'Malokarpatská saláma',
          'Maďarská saláma',
          'Nitran saláma',
          'Talianske a španielske salámy',
          'Vysočina saláma',
          'Zimná saláma',
        ],
      },
      {
        name: 'Slaniny',
        items: ['Anglická slanina', 'Oravská slanina'],
      },
      {
        name: 'Párky',
        items: [
          'Bratislavské párky',
          'Debrecínske a Frankfurtské párky',
          'Hydinové a kuracie párky',
          'Klasické bravčové párky',
          'Spišské párky',
          'Viedenské párky',
          'Zipser párky',
          'Špeciálne a ochutené párky',
        ],
      },
    ],
  },
  {
    key: 'readyMeals',
    subgroups: [
      {
        items: [
          'Halušky',
          'Hotové bagety',
          'Hotové sendviče',
          'Knedla',
          'Knedličky, šúlance, pirohy a pirôžky',
          'Lasagne',
          'Lokše',
          'Palacinky',
          'Zemiakové placky',
        ],
      },
    ],
  },
  {
    key: 'drugstore',
    subgroups: [
      {
        name: 'Drogéria a kozmetika',
        items: [
          'Aviváž',
          'Balzamy a kondicionéry na vlasy',
          'Dezinfekcie a antibakteriálne gély',
          'Dezodoranty a antiperspiranty',
          'Farba na vlasy',
          'Gél na vlasy',
          'Hygienické vložky',
          'Intímna starostlivosť',
          'Kozmetické darčekové balenia',
          'Krém na zubné náhrady',
          'Kúpeľová soľ',
          'Lak na vlasy',
          'Masky a kúry',
          'Micelárne vody a odličovače',
          'Odlakovače na nechty',
          'Pena na holenie',
          'Pracie gély',
          'Pracie tablety',
          'Sprchové gély a šampóny',
          'Tekuté mydlá',
          'Telové mlieka a telové krémy',
          'Toaletný papier',
          'Tuhé mydlá',
          'Utierky',
          'Vlasové tonikum',
          'Vlhčené obrúsky',
          'Vlhčený toaletný papier',
          'Vreckovky',
          'WC blok',
          'Zubná pasta',
          'Zubné kefky',
          'Ústna voda',
          'Čistiace prostriedky na riad',
          'Čistiacie prostriedky',
        ],
      },
      {
        name: 'Pranie a domácnosť', // inferred (parent_id 1)
        items: ['Kapsuly do umývačky riadu', 'Plienky', 'Pracie prachy'],
      },
    ],
  },
];
