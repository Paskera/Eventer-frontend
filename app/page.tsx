import Image from 'next/image';
import logo from '@/public/logo.png';
import './styles/page.css';
import { AuthButton } from '@/components/authbutton';

export default function Home() {
  return (
    <div className="background">
      <div className="container">
        <div className="content">
          <div className="logo-container flex items-center justify-center">
            <Image
              src={logo}
              alt="Horizen Logo"
              className="w-[100px] h-[100px] rounded-full object-cover"
              priority
            />
          </div>

          <h1 className="title">Horizon</h1>

          <p className="subtitle">
            Horizon — удобный сервис для<br />
            организации мероприятий в<br />
            университете
          </p>

          <div className="relative group flex justify-center mt-4">
            <div className="absolute w-[264px] h-[72px] bg-white/30 rounded-lg blur-[12px] opacity-0 group-hover:opacity-100 transition duration-300 translate-y-0"></div>
            <AuthButton />
          </div>
        </div>
      </div>
    </div>
  );
}