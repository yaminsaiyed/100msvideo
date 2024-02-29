import { useEffect } from "react";
import Conference from "@/components/Conference";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore
} from "@100mslive/react-sdk";
import Footer from "@/components/Footer";

export default function Home() {
  const hmsActions = useHMSActions();

  
 


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    // use room code to fetch auth token
    let roomCode ="aow-njaw-gwa";
    let userName ="heapdo1";
    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })
    
    try {
      await hmsActions.join({ userName, authToken });
    } catch (e) {
      console.error(e)
    }
  };


  useEffect(() => {
    window.onunload = () => {
      hmsActions.leave();
    };
  }, [hmsActions]);


  const isConnected = useHMSStore(selectIsConnectedToRoom);
  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <>
    <div className="App">
    <form onSubmit={handleSubmit}>
     <button className="btn-primary">Join</button>
    </form>
    {isConnected ? (
      <>
        <Conference />
        <Footer />
        </>
      ) : (
       <></>
      )}
    </div>
    </>
  );
}
