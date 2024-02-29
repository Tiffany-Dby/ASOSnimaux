import { resetFormNewTestimony, setAllByOneUser, setAllByOneUserError, setAllTestimonies, setAllTestimoniesError, setDeleteTestimony, setDeleteTestimonyByAdmin, setDeleteTestimonyError, setNewTestimony, setNewTestimonyError, setOverviewTestimonyError, setSelectedTestimonyError, setTestimonyOverview, setUpdateSelectedTestimony, startAllByOneUserLoading, startAllTestimoniesLoading, startDeleteTestimonyLoading, startNewTestimonyLoading, startOverviewTestimonyLoading, startSelectedTestimonyLoading } from "../redux/reducers/testimony.reducer";
import { getFromStorage } from "../utils/storage.utils";
import { showToast } from "../utils/toast.utils";
import { deleteRequest, getRequest, postRequest, putRequest } from "./api";


export const getTestimoniesOverviewThunk = () => async (dispatch, getState) => {
  const { overviewTestimonyLoading } = getState().testimonyReducer;
  if (overviewTestimonyLoading) return;

  dispatch(startOverviewTestimonyLoading());

  const { result, error, status } = await getRequest("testimonies/overview");
  if (!result?.message || status >= 400 || !!error) return dispatch(setOverviewTestimonyError({ error: `Something went wrong : ${error}` }));

  dispatch(setTestimonyOverview({ overview: result.result }))
}

export const getAllTestimoniesThunk = () => async (dispatch, getState) => {
  const { allTestimoniesLoading } = getState().testimonyReducer;
  if (allTestimoniesLoading) return;

  dispatch(startAllTestimoniesLoading());

  const { result, error, status } = await getRequest("testimonies");
  if (!result?.message || status >= 400 || !!error) return dispatch(setAllTestimoniesError({ error: `Something went wrong : ${error}` }));

  dispatch(setAllTestimonies({ testimonies: result.result }));
}

export const getOneUserTestimoniesThunk = () => async (dispatch, getState) => {
  const { allByOneUserLoading } = getState().testimonyReducer;
  const token = getFromStorage("token");
  if (allByOneUserLoading) return;

  dispatch(startAllByOneUserLoading());

  const { result, error, status } = await getRequest("testimonies/all/user", token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setAllByOneUserError({ error: `Something went wrong: ${error}` }));

  dispatch(setAllByOneUser({ testimonies: result.result }));
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

export const updateTestimonyThunk = () => async (dispatch, getState) => {
  const { selectedTestimonyLoading, testimonies } = getState().testimonyReducer;
  const { selectedTestimony } = testimonies;
  const token = getFromStorage("token");
  if (selectedTestimonyLoading) return;

  dispatch(startSelectedTestimonyLoading());

  const formatExpectedOnRequest = {
    testimonyID: selectedTestimony.id,
    content: selectedTestimony.content
  }

  const { result, error, status } = await putRequest("testimonies", formatExpectedOnRequest, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSelectedTestimonyError({ error: `Something went wrong : ${error}` }));

  dispatch(setUpdateSelectedTestimony({ testimony: { id: result.testimony.id, content: result.testimony.content, date: result.testimony.date, user_id: result.testimony.user_id } }));
  showToast(dispatch);
}

export const deleteTestimonyThunk = () => async (dispatch, getState) => {
  const { deleteTestimonyLoading, testimonies } = getState().testimonyReducer;
  const { selectedTestimony } = testimonies;
  const { user } = getState().userReducer;
  const token = getFromStorage("token");
  if (deleteTestimonyLoading) return;

  dispatch(startDeleteTestimonyLoading());

  const { result, error, status } = await deleteRequest(`testimonies/${selectedTestimony.id}`, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setDeleteTestimonyError({ error: `Something went wrong : ${error}` }));

  if (user.role === "admin" || user.role === "super_admin") {
    dispatch(setDeleteTestimonyByAdmin({ id: selectedTestimony.id }))
  }
  if (user.id === selectedTestimony.user_id) {
    dispatch(setDeleteTestimony({ id: selectedTestimony.id }));
  }

  showToast(dispatch);
}