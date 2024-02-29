import { useDispatch, useSelector } from "react-redux";
import "./adminTestimonies.scss";
import { FaTrashCan } from "react-icons/fa6";
import { setToLocalDate } from "../../utils/date.utils";
import { setIsDeleteTestimonyByAdmin } from "../../redux/reducers/dialog.reducer";
import { setSelectedTestimony } from "../../redux/reducers/testimony.reducer";

const AdminTestimonies = () => {
  const dispatch = useDispatch();

  // Testimony Reducer
  const { testimonies, allTestimoniesLoading, allTestimoniesError } = useSelector(state => state.testimonyReducer);
  const { all } = testimonies;

  // *************** Set Dialog Type -> Open ***************
  // Delete Testimony Dialog
  const handleDeleteTestimonyByAdmin = (testimony) => {
    dispatch(setIsDeleteTestimonyByAdmin());
    dispatch(setSelectedTestimony({ id: testimony.id }));
  }
  // *************** End Set Dialog Type -> Open ***************

  return (
    <>
      <section className="admin__wrapper">
        <div className="admin__all-testimonies">
          {allTestimoniesError &&
            <p className="text-error">{allTestimoniesError}</p>
          }
          <div className="admin__header">
            <h2>Tous les témoignages ({all.length})</h2>
            {allTestimoniesLoading &&
              <div className="loading">
                <span className="loading__spin"></span>
                <p className="loading__text">Chargement des témoignages en cours...</p>
              </div>
            }
          </div>
          <ul className="admin__all-testimonies__wrapper">
            {all.map(testimony => (
              <li key={testimony.id} className="admin__testimony">
                <blockquote className="admin__testimony__content">
                  <div className="admin__testimony__text">
                    <p>{testimony.content}</p>
                  </div>
                  <cite className="admin__testimony__cite">
                    <p>{testimony.username} - {setToLocalDate(testimony.date)}</p>
                  </cite>
                </blockquote>
                <div className="icons-wrapper">
                  <FaTrashCan className="manage-icons" color="var(--dark-red)" onClick={() => handleDeleteTestimonyByAdmin(testimony)} role="button" aria-label="Bouton de suppression du témoignage" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default AdminTestimonies;