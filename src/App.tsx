import { useState } from 'react'
import './App.css'
import Introduction from './components/introduction/Introduction'
import Contact from './components/contact/Contact'
import Art from './components/art/Art'
import DrawingCanvas from './components/drawing/DrawingCanvas'
import paintbrushIcon from '@/assets/Icons/paintbrush.png'

import Christmas2024 from '@/assets/PhysicalArt/Christmas2024.JPG'
import FineChina from '@/assets/PhysicalArt/FineChina.jpg'
import Flute from '@/assets/PhysicalArt/Flute.JPG'
import Forest from '@/assets/PhysicalArt/Forest.jpg'
import GouDan from '@/assets/PhysicalArt/GouDan.JPG'
import HigginsHouse from '@/assets/PhysicalArt/HigginsHouse.JPG'
import Lucidity from '@/assets/PhysicalArt/Lucidity.jpg'
import MAMSMural from '@/assets/PhysicalArt/MAMSMural.JPG'
import MapleSyrup from '@/assets/PhysicalArt/MapleSyrup.JPG'
import Marsh from '@/assets/PhysicalArt/Marsh.jpg'
import MiffyLandscape from '@/assets/PhysicalArt/MiffyLandscape.JPG'
import Nightstand from '@/assets/PhysicalArt/Nightstand.jpg'
import Stickers from '@/assets/PhysicalArt/Stickers.JPG'
import SeattleEats from '@/assets/PhysicalArt/SeattleEats.jpg'
import GouDanJan2026 from '@/assets/PhysicalArt/GouDanJan2026.jpg'
import RainierPainting from '@/assets/PhysicalArt/RainierPainting.jpg'
import GouacheGirls from '@/assets/PhysicalArt/GouacheGirls.jpg'

// Golden Goose NFT imports
import nft1 from '@/assets/GoldenGooseNFT/1.png'
import nft2 from '@/assets/GoldenGooseNFT/2.png'
import nft3 from '@/assets/GoldenGooseNFT/3.png'
import nft4 from '@/assets/GoldenGooseNFT/4.png'
import nft5 from '@/assets/GoldenGooseNFT/5.png'
import nft6 from '@/assets/GoldenGooseNFT/6.png'
import nft7 from '@/assets/GoldenGooseNFT/7.png'
import nft8 from '@/assets/GoldenGooseNFT/8.png'
import nft10 from '@/assets/GoldenGooseNFT/10.png'
import nft11 from '@/assets/GoldenGooseNFT/11.png'
import nft12 from '@/assets/GoldenGooseNFT/12.png'
import nft13 from '@/assets/GoldenGooseNFT/13.png'
import nft14 from '@/assets/GoldenGooseNFT/14.png'
import nft15 from '@/assets/GoldenGooseNFT/15.png'
import nft16 from '@/assets/GoldenGooseNFT/16.png'
import nft17 from '@/assets/GoldenGooseNFT/17.png'
import nft18 from '@/assets/GoldenGooseNFT/18.png'
import nft19 from '@/assets/GoldenGooseNFT/19.png'
import nft20 from '@/assets/GoldenGooseNFT/20.png'
import nft21 from '@/assets/GoldenGooseNFT/21.png'
import nft22 from '@/assets/GoldenGooseNFT/22.png'
import nft23 from '@/assets/GoldenGooseNFT/23.png'
import nft24 from '@/assets/GoldenGooseNFT/24.png'
import nft25 from '@/assets/GoldenGooseNFT/25.png'

const goldenGooseNFTs = [
  nft1, nft2, nft3, nft4, nft5, nft6, nft7, nft8,
  nft10, nft11, nft12, nft13, nft14, nft15, nft16,
  nft17, nft18, nft19, nft20, nft21, nft22, nft23, nft24, nft25
]

const artworks = [
  { id: 1, src: RainierPainting, alt: 'Rainier Painting', title: 'Commute Kairos', year: '2026', description: 'Everyday I would ride the bus home in Seattle in the fall, when sunset is perfectly around 5-6 pm, and look forward to the opportunity of sighting Mount Rainier as we crossed the Evergreen Point Bridge. Often, it was too cloudy, but I always made sure to sit on the left side of the bus and watch. This is my largest painting, a 30x40 inch.', medium: 'Acrylic' },
  { id: 2, src: GouDanJan2026, alt: 'Gou Dan Jan 2026', title: 'Shoveling Companion', year: '2026', description: 'On cold dark mornings when clearing freshly fallen snow, it sure is nice to have a companion who doesn\'t appear to feel the cold at all.', medium: 'Acrylic' },
  { id: 3, src: SeattleEats, alt: 'Seattle Eats', title: 'Cara\'s Seattle Eats', year: '2025', description: 'Exploring a new city means new delicious places to eat.', medium: 'Micron Pen' },
  { id: 4, src: Stickers, alt: 'Stickers', title: 'Assorted Stickers', year: '2022', description: 'In high school I wondered if people would buy my art on a sticker and brought it to a college fair. They were a hit.', medium: 'Digital Art' },
  { id: 5, src: Marsh, alt: 'Marsh', title: 'Utopia', year: '2021', description: 'I love to up the saturation of photos, but when painting, that can be the default.', medium: 'Oil' },
  { id: 6, src: Lucidity, alt: 'Lucidity', title: 'Lucidity', year: '2021', description: 'Playing with colors, clouds, and chiffon.', medium: 'Acrylic' },
  { id: 7, src: GouDan, alt: 'Gou Dan', title: 'Pretty in Pink', year: '2025', description: 'My mom requested a painting to match the pink shower curtain in the bathroom, now every time I pull back the curtain I smile at the joyful dog that appears on the wall.', medium: 'Acrylic' },
  { id: 8, src: FineChina, alt: 'Fine China', title: 'Oranges and China', year: '2023', description: 'A large 24x36" canvas started with me wanting to paint oranges and china, but soon I realized I should fill the space with more variety.', medium: 'Acrylic' },
  { id: 9, src: MapleSyrup, alt: 'Maple Syrup', title: 'Unconventional Vases', year: '2021', description: 'I put flowers in an old maple syrup glass.', medium: 'Gouache' },
  { id: 10, src: Nightstand, alt: 'Nightstand', title: 'Nightstand', year: '2024', description: 'In Fall 2024 I finally took an art class. This assignment was to paint a scene with one color, I chose blue and my nightstand which featured jewelry, a mini globe, and a candle.', medium: 'Acrylic' },
  { id: 11, src: MAMSMural, alt: 'Colorful Mural with 4 distinct sections with different students doing activities in each displayed on the wall of the Massachusetts Academy of Math and Science Library.', title: 'MAMS Mural', year: '2022', description: 'One day in high school I proposed the idea of painting a mural to my advisor, he immediately got up and started looking for a spot on the school\'s walls for it, that was pretty awesome.', medium: 'Acrylic' },
  { id: 12, src: Forest, alt: 'Forest', title: 'Beams', year: '2023', description: 'I wanted to paint a forest and then realized I had no green paint left, it became a good color theory exercise instead.', medium: 'Acrylic' },
  { id: 13, src: MiffyLandscape, alt: 'Miffy Landscape', title: 'Tiny Miffy', year: '2024', description: 'A tiny scene of miffy as a birthday gift for a friend when I was too sick to visit.', medium: 'Acrylic' },
  { id: 14, src: HigginsHouse, alt: 'Higgins House', title: 'Higgins House', year: '2021', description: 'A snowy day on the WPI campus at my favorite spot, the higgins house arches.', medium: 'Gouache' },
  { id: 15, src: Flute, alt: 'Flute', title: 'Flautist', year: '2021', description: 'A gift for my flute teacher of many years.', medium: 'Acrylic' },
  { id: 16, src: Christmas2024, alt: 'Christmas 2024', title: 'Living Room ', year: '2025', description: 'My mom requested a painting that matched our living room, a room with blue couches, warm golden light, small red flowers in china vases atop oak wood tables, and enormous floor to ceiling scrolls of Chinese characters on the walls.', medium: 'Acrylic' },
  { id: 17, src: GouacheGirls, alt: 'Gouache Girls', title: 'Gouache Girls', year: '2026', description: 'Some portraits based on Pinterest references.', medium: 'Gouache' },
]

function App() {
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#EAE0CC] relative">
      {/* Paintbrush toggle button */}
      <button
        onClick={() => setShowCanvas(!showCanvas)}
        className="fixed top-4 right-4 z-50 p-2 transition-all hover:scale-130"
        aria-label={showCanvas ? "Back to portfolio" : "Open drawing canvas"}
      >
        <img src={paintbrushIcon} alt="Toggle drawing canvas" className="w-8 h-8 object-contain" />
      </button>

      {showCanvas ? (
        <DrawingCanvas />
      ) : (
        <>
          {/* Intro/Contact section */}
          <div className="flex flex-col md:flex-row gap-5 px-5 py-5 lg:px-50 lg:py-10">
            <div className="w-full md:w-1/2"><Introduction /></div>
            <div className="w-full md:w-1/2"><Contact/></div>
          </div>

          <div className="columns-2 md:columns-3 gap-2 md:gap-4 px-5 lg:px-10 py-5 [&>*]:mb-2 md:[&>*]:mb-4 [&>*]:break-inside-avoid bg-[#EC573F]">
            {artworks.map((art) => (
              <Art
                key={art.id}
                src={art.src}
                alt={art.alt}
                title={art.title}
                year={art.year}
                description={art.description}
                medium={art.medium}
              />
            ))}
          </div>

          {/* Golden Goose NFT Section */}
          <div className="px-5 lg:px-10 py-10">
            <p className="text-center max-w-3xl mx-auto mb-8 body-text">
              Golden Goose was a cryptocurrency scavenger hunt that used poems as clues to reveal the coins in specific locations around a city with a NFT to match the neighborhood it was hidden in. I was commissioned to create the first collection of NFTs which was hidden in Boston's many vibrant neighborhoods.
            </p>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
              {goldenGooseNFTs.map((nft, index) => (
                <img
                  key={index}
                  src={nft}
                  alt={`Golden Goose NFT ${index + 1}`}
                  className="w-full rounded-lg"
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
