import { Navigate, useNavigate, useParams } from "react-router"
import { getHeroById } from "../helpers";
import { useMemo } from "react";

export const HeroPage = () => {

  const navigate = useNavigate()

  const {id} = useParams();
  const hero = useMemo( () => getHeroById( id ), [id])

  const onNavigateBack = () => {
    navigate(-1);
  }

  if( !hero ){
    return <Navigate to="marvel"/>
  }

  const heroImageUrl = `/assets/heroes/${id}.jpg`;

  
  return (
    <div className="row mt-5 animate__animated animate__pulse">
        <div className="col-4">
          <img className="img-thumbnail" src={heroImageUrl} alt={hero.superhero} />
        </div>
        <div className="col-8">
          <h3>{hero.superhero}</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><b>Alter ego:</b> {hero.alter_ego}</li>
            <li className="list-group-item"><b>Publisher:</b> {hero.publisher}</li>
            <li className="list-group-item"><b>First Appearence:</b> {hero.first_appearance}</li>
          </ul>
          <h5 className="mt-3">characters</h5>
          <p>{hero.characters}</p>

          <button className="btn btn-primary" onClick={onNavigateBack}>Regresar</button>

        </div>
    </div>
  )
}
