import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

function Avatar() {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const avatar = localStorage.getItem('avatar');
  return (
    <div className="flex items-center justify-center mt-5 mb-5">
      <div className="flex items-center gap-5">
        <img src={avatar} className="w-12 h-12 rounded-full" />
        <div>
          <span className="text-xl text-white font-semibold">{name}</span>
          <span className="text-xl text-pgray">${email}</span>
        </div>
        <div>
          <Link to="/Post">
            <Button>Publicar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Avatar;
