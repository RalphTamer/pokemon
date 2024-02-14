"use client";

import { PokeList, pokeDetails } from "@/Services/indexPage.service";
import { useQuery } from "@tanstack/react-query";
import z from "zod";
const pokeDetailsSchema = z.array(
  z.object({
    name: z.string(),
  })
);
type Props = {
  pokeList: PokeList;
};
const HomePage = (props: Props) => {
  const { data, error } = useQuery({
    queryKey: ["pokeDetails"],
    queryFn: () => pokeDetails(props.pokeList),
  });
  if (data != null) {
    pokeDetailsSchema.parse(data);
  }
  console.log(data);

  return <div></div>;
};

export default HomePage;
