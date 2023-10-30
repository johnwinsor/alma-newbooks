import React from "react";
import Image from 'next/image'
import {Link} from "@nextui-org/react";
import facebook from '../public/FB-f-Logo__white_18.png'
import instagram from '../public/Instagram-Logo_18.png'

export default function Social() {
  return (
    <div className="h-10 grid grid-flow-col auto-cols-max gap-4 content-end place-content-end">
      <div className="myminerva">
        <a href="https://onesearch.library.northeastern.edu/discovery/account?vid=01NEU_INST:NU_Olin&amp;section=overview&amp;lang=en">My Library Account</a>
      </div>
      <div className="social">
        <Link href="https://www.facebook.com/MillsCollegeLibrary/" target="_blank" rel="noopener noreferrer" title="Facebook">
        <Image
          src={facebook}
          alt="Picture of the author"
          height={20}
        />
        </Link>
      </div>
      <div>  
        <Link href="https://www.instagram.com/f.w.olinlibrary/" target="_blank" rel="noopener noreferrer" title="Instagram">
          <Image
            src={instagram}
            alt="Picture of the author"
            height={20}
          />
        </Link>
      </div>
    </div>
  );
}