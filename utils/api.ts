import { Module } from "./nus_module_interfaces";
import axios from "axios";
import { supabase } from "./supabase";

interface IFetchWrapper {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  baseUrl?: "INTERNAL" | "NUSMODS";
}

const mainAxios = axios.create({
  baseURL: "",
});

const nusModsAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NUS_MODS_API,
});

const axiosWrapper = ({ url, method, baseUrl = "INTERNAL" }: IFetchWrapper) => {
  let axios;

  switch (baseUrl) {
    case "INTERNAL":
      axios = mainAxios;
      break;
    case "NUSMODS":
      axios = nusModsAxios;
  }

  switch (method) {
    case "GET":
      const res = axios.get(`${url}`).then((res) => {
        return res.data;
      });
      return res;

    case "POST":
      break;

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
export const getRankedModules: () => Promise<Module[]> = async () => {
  const { data: modulesData } = await supabase.from("Reviews").select("*");

  return modulesData;
};
