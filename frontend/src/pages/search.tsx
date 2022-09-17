import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GitPoapApiClient, GitPoapEvent } from "../services/gitPoapApiClient";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventToSearch, setEventToSearch] = useState<string>("");
  const [eventResult, setEventResult] = useState<GitPoapEvent>();
  const apiClient = new GitPoapApiClient();
  const router = useRouter();

  const handleEventSubmit = async () => {
    try {
      const result = await apiClient.getEvent(eventToSearch);
      setEventResult(result);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    console.log(eventToSearch);
  }, [eventToSearch]);

  useEffect(() => {
    if (eventResult) {
      console.log(eventResult)
      router.push("/event")
    }
  }, [eventResult, router]);


  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">Search GitPoap Events </h1>
            <div className="pt-5">
              <input type="text" placeholder="Event Id or Fancy Id" className="input w-full max-w-xs" onChange={(input) => {
              setEventToSearch(input.target.value);
              }}/>
            </div>
            <div className="pt-5">
            {isLoading ? (
              <button className="btn loading">loading</button>
            ) : (
              <button className="btn gap-2" onClick={() => {setIsLoading(true); handleEventSubmit()}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  Search
              </button>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
