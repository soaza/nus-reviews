import { Module } from "./nus_module_interfaces";
import axios from "axios";
import { supabase } from "./supabase";
import { ILeaderboardModule } from "./interface";

interface IFetchWrapper {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  baseUrl?: "INTERNAL" | "NUSMODS";
  body?: Record<string, unknown>;
}

const mainAxios = axios.create({
  baseURL: "api",
});

const nusModsAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NUS_MODS_API,
});

const axiosWrapper = ({
  url,
  method,
  baseUrl = "INTERNAL",
  body,
}: IFetchWrapper) => {
  let axios;

  switch (baseUrl) {
    case "INTERNAL":
      axios = mainAxios;
      break;
    case "NUSMODS":
      axios = nusModsAxios;
  }

  let res;

  switch (method) {
    case "GET":
      res = axios.get(`${url}`).then((res) => {
        return res.data;
      });
      return res;

    case "POST":
      res = axios.post(`${url}`, body).then((res) => {
        return res.data;
      });
      return res;

    case "PUT":
      break;

    case "DELETE":
      break;
  }
};

// NUSMODS
export const getModule: (moduleCode: string) => Promise<Module> = async (
  moduleCode
) => {
  const res = await axiosWrapper({
    url: `2021-2022/modules/${moduleCode}.json`,
    method: "GET",
    baseUrl: "NUSMODS",
  });

  return res;
};

export const getAllModules: () => Promise<Module[]> = async () => {
  const res = await axiosWrapper({
    url: "2021-2022/moduleList.json",
    method: "GET",
    baseUrl: "NUSMODS",
  });

  return res;
};

// LEADERBOARD APIs
export const getMostReviewedModules: (
  maxRows?: number
) => Promise<ILeaderboardModule[]> = async (maxRows?: number) => {
  const res = await axiosWrapper({
    url: "leaderboard/most_reviewed_modules",
    method: "POST",
    body: { offset: maxRows },
  });

  return res;
};
