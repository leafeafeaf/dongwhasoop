import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import BookEnd from "./pages/BookEnd";
import BookIntro1 from "./pages/BookIntro1";
import BookIntro2 from "./pages/BookIntro2";
import BookList from "./pages/BookList";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import MailDetail from "./pages/MailDetail";
import MailList from "./pages/MailList";
import Profile from "./pages/Profile";
import RecInfo from "./pages/RecInfo";
import Settings from "./pages/Settings";
import SongDetail from "./pages/SongDetail";
import SongEnd from "./pages/SongEnd";
import StartSettings from "./pages/StartSettings";
import VoiceRec from "./pages/VoiceRec";
import WriteLetter from "./pages/WriteLetter";
import BookDetail from "./pages/BookDetail";
import SendWho from "./pages/SendWho";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/bookend" element={<BookEnd></BookEnd>}></Route>
      <Route path="/bookintro1" element={<BookIntro1></BookIntro1>}></Route>
      <Route path="/bookintro2" element={<BookIntro2></BookIntro2>}></Route>
      <Route path="/booklist" element={<BookList></BookList>}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/loading" element={<Loading></Loading>}></Route>
      <Route path="/maildetail" element={<MailDetail></MailDetail>}></Route>
      <Route path="/maillist" element={<MailList></MailList>}></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
      <Route path="/recinfo" element={<RecInfo></RecInfo>}></Route>
      <Route path="/settings" element={<Settings></Settings>}></Route>
      <Route path="/songdetail" element={<SongDetail></SongDetail>}></Route>
      <Route path="/songend" element={<SongEnd></SongEnd>}></Route>
      <Route path="/startsettings" element={<StartSettings></StartSettings>}></Route>
      <Route path="/voicerec" element={<VoiceRec></VoiceRec>}></Route>
      <Route path="/writeletter1" element={<WriteLetter></WriteLetter>}></Route>
      <Route path="/bookdetail" element={<BookDetail></BookDetail>}></Route>
      <Route path="/sendwho" element={<SendWho></SendWho>}></Route>
    </Routes>
  );
}

export default App;
