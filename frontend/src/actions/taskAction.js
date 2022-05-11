import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_LIST_FAIL,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
} from "../constants/taskConstants";
import axios from "axios";

export const listtask = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/task`, config);

    dispatch({
      type: TASK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TASK_LIST_FAIL,
      payload: message,
    });
  }
};

export const createtaskAction =
  (title, content, category) => async (dispatch, getState) => {
    console.log("hi from creation");
    try {
      dispatch({
        type: TASK_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/tasks/create`,
        { title, content, category },
        config
      );

      dispatch({
        type: TASK_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(message);
      dispatch({
        type: TASK_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deletetaskAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/task/${id}`, config);

    dispatch({
      type: TASK_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TASK_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updatetaskAction =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TASK_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/task/${id}`,
        { title, content, category },
        config
      );

      dispatch({
        type: TASK_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: TASK_UPDATE_FAIL,
        payload: message,
      });
    }
  };
