import API from "../utils/axios.js";


export const getAllContent = async () => {
  const res = await API.get("/content");
  return res.data;
};

export const createContent = async (data)=>{
  return API.post("/content", data)
}

export const deleteContent = async (id) => {
  const res = await API.delete(`/content/${id}`);
  return res.data;
};

// SEMANTIC SEARCH
export const searchContent = async (query) => {
  const res = await API.post("/content/semantic-search", {
    query
  });
  return res.data.results;
};

// RELATED (embedding similarity)
export const getRelated = async (id) => {
  const res = await API.get(`/content/related/${id}`);
  return res.data;
};

// RESURFACE (old memories)
export const getResurfaced = async () => {
  const res = await API.get("/content/resurface");
  return res.data;
};

// For Graph
export const getGraph = async ()=>{
  const res = await API.get("/content/graph")
  return res.data
}

export const login = async (data)=>{
  const res = await API.post("/auth/login",data)
  return res.data
}

export const register = async (data)=>{
  const res = await API.post("/auth/register",data)
  return res.data
}

export const logout = async ()=>{
  const res = await API.post("/auth/logout")
  return res.data
} 

export const me = async ()=>{
  const res = await API.get("/auth/me")
  return res.data
}