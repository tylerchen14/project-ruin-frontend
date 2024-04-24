import Title from '@/components/title/title';
import useE from '@/contexts/use-effect';
import useGift from '@/contexts/use-gift';
import useToggle from '@/contexts/use-toggle-show';
import { RiArrowLeftSLine, RiArrowRightSLine, RiCloseLine, RiCoinFill } from "@remixicon/react";
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import GiftShow from '../giftShow/giftShow';
import styles from './streamScreen.module.css';
const StreamContent = dynamic(() => import('@/components/stream/stream'), {
  ssr: false,
})

export default function StreamScreen({ isConnected }) {
  const { gList, giftRain, handleGiveGift, isAnimating, setIsAnimating } = useGift()
  const { onPhone, showChatroom, showSidebar, showGift, handleChatroom, handleSidebarHide } = useToggle()
  const { eList, handleGiveEffect, showEffect } = useE()

  return (
    <div className={styles['mainframe']}>

      {/* <div className={`absolute w-full h-full ${isAnimating ? "z-50" : "z-0"}`}> */}
      <AnimatePresence>
        {giftRain.map(g => {
          return <GiftShow
            key={g.id + '-' + new Date().getTime()}
            giftrain={g.gift}
            size={g.size}
            setIsAnimating={setIsAnimating}
          ></GiftShow>
        })}
      </AnimatePresence>
      {/* </div> */}

      {/* 左邊收起按鈕 */}
      <div className={`${styles['arrow-box-left']} ${onPhone ? "hidden" : ""}`}
        onClick={handleSidebarHide}
      >
        {showSidebar ? <RiArrowLeftSLine /> : <RiArrowRightSLine />}
      </div>

      {/* 右邊收起按鈕 */}
      <div className={`${styles['arrow-box-right']} ${onPhone ? "hidden" : ""}`}
        onClick={handleChatroom}
      >
        {showChatroom ? <RiArrowRightSLine /> : <RiArrowLeftSLine />}
      </div>

      {/* 跳回上一頁 */}
      <Link href="./index">
        <RiCloseLine className={styles['cancel']} />
      </Link>

      {/* 標題敘述 -桌機 */}
      {onPhone ? "" : <Title></Title>}

      {/* 直播框 */}
      <StreamContent
        isConnected={isConnected}
      ></StreamContent>

      {/* 標題敘述 -手機 */}
      {onPhone ? <Title></Title> : ""}

      {/* 禮物框 */}
      {showEffect ?
        <>
          <div className={`${styles['gift-bar']} ${!onPhone ? "" : showGift ? "" : styles.hide} w-5/12 gap-14 max-md:top-[460px]`}>
            {eList.map((c, i) => {
              return (
                <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer " key={i}>
                  <motion.div
                    whileHover={{
                      rotate: -10,
                      scale: 1.3
                    }}
                  >
                    <Image
                      width={44}
                      height={44}
                      src={c.src}
                      className={`${styles['circle']} ${c.grayscale ? "grayscale" : ""}`}
                      alt={c.name}
                      onClick={() => { handleGiveEffect(c.price, c.name) }}
                    ></Image>
                  </motion.div>
                  <div className="text-sm">{c.name}</div>
                  <div className="flex gap-0.5 items-center">
                    <RiCoinFill style={{ color: "#fff400" }} className='mt-1 h-4'></RiCoinFill>
                    <div className='mr-2 text-sm'>{c.price}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
        :
        <>
          <div className={`${styles['gift-bar']} ${showGift ? "" : "max-md:opacity-0"} gap-8 max-md:top-[445px]`}>
            {gList.map((c, i) => {
              return (
                <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer" key={i}>
                  <motion.div
                    whileHover={{
                      rotate: -10,
                      scale: 1.3
                    }}
                  >
                    <Image
                      width={44}
                      height={44}
                      src={c.src}
                      className={`${styles['circle']} ${c.grayscale ? "grayscale" : ""}`}
                      alt={c.name}
                      onClick={() => handleGiveGift(c.price, c.chance, c.name, c.src)}
                    ></Image>
                  </motion.div>

                  <div className='text-sm'>{c.name}({c.chance})</div>
                  <div className="flex items-center">
                    <RiCoinFill
                      style={{ color: "#fff400" }}
                      className='mt-1 h-4'></RiCoinFill>

                    <div
                      className='mr-2 text-sm'>{c.price}</div>
                  </div>
                </div>
              )
            })}

          </div>

        </>}

    </div>

  )
}
