import { resetFormNewTestimony, setNewTestimony, setNewTestimonyError, setOverviewTestimonyError, setTestimonyOverview, startNewTestimonyLoading, startOverviewTestimonyLoading } from "../redux/reducers/testimony.reducer";
import { getFromStorage } from "../utils/storage.utils";
import { showToast } from "../utils/toast.utils";
import { getRequest, postRequest } from "./api";


export const getTestimoniesOverviewThunk = () => async (dispatch, getState) => {
  const { overviewTestimonyLoading } = getState().testimonyReducer;
  if (overviewTestimonyLoading) return;

  dispatch(startOverviewTestimonyLoading());

  const { result, error, status } = await getRequest("testimonies/overview");
  if (!result?.message || status >= 400 || !!error) return dispatch(setOverviewTestimonyError({ error: `Something went wrong : ${error}` }));

  dispatch(setTestimonyOverview({ overview: result.result }))
}

export const postTestimonyThunk = () => async (dispatch, getState) => {
  const { newTestimonyLoading, testimonies } = getState().testimonyReducer;
  const { newTestimony } = testimonies;
  const token = getFromStorage("token");
  if (newTestimonyLoading) return;

  dispatch(startNewTestimonyLoading());

  const { result, error, status } = await postRequest("testimonies", newTestimony, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setNewTestimonyError({ error: `Something went wrong : ${error}` }));

  dispatch(setNewTestimony({ testimony: result.testimony }));

  showToast(dispatch);
  dispatch(resetFormNewTestimony());
}