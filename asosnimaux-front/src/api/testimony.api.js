import { setOverviewTestimonyError, setTestimonyOverview, startOverviewTestimonyLoading } from "../redux/reducers/testimony.reducer";
import { getRequest } from "./api";


export const getTestimoniesOverviewThunk = () => async (dispatch, getState) => {
  const { overviewTestimonyLoading } = getState().testimonyReducer;
  if (overviewTestimonyLoading) return;

  dispatch(startOverviewTestimonyLoading());

  const { result, error, status } = await getRequest("testimonies/overview");
  if (!result.message || status >= 400 || !!error) return dispatch(setOverviewTestimonyError({ error: `Something went wrong : ${error}` }));

  dispatch(setTestimonyOverview({ overview: result.result }))
}