import "./schedules.scss";

const Schedules = () => {
  return (
    <>
      <div className="title-wrapper">
        <h2>Horaires</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Jours</th>
            <th scope="col">Heures</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lundi</td>
            <td>Fermé</td>
          </tr>
          <tr>
            <td>Mardi</td>
            <td>9h - 18h</td>
          </tr>
          <tr>
            <td>Mercredi</td>
            <td>9h - 18h</td>
          </tr>
          <tr>
            <td>Jeudi</td>
            <td>9h - 18h</td>
          </tr>
          <tr>
            <td>Vendredi</td>
            <td>9h - 18h</td>
          </tr>
          <tr>
            <td>Samedi</td>
            <td>9h - 19h</td>
          </tr>
          <tr>
            <td>Dimanche</td>
            <td>Fermé</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Schedules;