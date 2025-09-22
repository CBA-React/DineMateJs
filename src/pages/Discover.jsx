import { useState } from "react";
// import ReactCurvedText from "react-curved-text";
import DiscoverDeck from "/src/components/discover/DiscoverDeck";
import { useNavigate } from "react-router-dom";
import EndOfPeopleModal from "/src/components/discover/EndOfPeopleModal";
import { MatchModal } from "/src/components/discover/MatchModal";
import { PEOPLE } from "/src/constants";

const Discover = () => {
    const [endOpen, setEndOpen] = useState(false);
    const [matchOpen, setMatchOpen] = useState(false);
    const [matchedUser, setMatchedUser] = useState(null);
    const navigate = useNavigate();

    const handleDecision = ({ person, dir }) => {
        if (dir === "right" /* && person.isMutual === true */) {
          setMatchedUser({ name: person.name, avatar: person.photo });
          setMatchOpen(true);
        }
      };
    
      return (
        <div 
          className="relative font-serif mb-[60px] md:mb-[120px]"
          style={{
            background: 'linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)',
            minHeight: '600px'
          }}
        >
            <img 
              src="/pictures/discover-bg.svg" 
              alt="Discover background" 
              className="absolute inset-0 w-full h-full object-cover object-[center_0%] translate-y-1/3" 
            />
            <section className="absolute z-10 mx-auto flex -translate-y-1/4 -translate-x-1/2 top-2/5 md:top-1/2 left-1/2 max-w-7xl items-center justify-center px-4 sm:px-6">
                <DiscoverDeck
                    people={PEOPLE}
                    onDecision={handleDecision}
                    onEmpty={() => setEndOpen(true)}
                />
            </section>
            {matchOpen && 
              <MatchModal
                open={matchOpen}
                onClose={() => {setMatchOpen(false)}}
                me={{ name: "You", avatar: "/pictures/avatar.jpg" }}
                match={matchedUser || { name: "", avatar: "" }}
                onFindRestaurant={() => { setMatchOpen(false); navigate("/restaurants"); }}
                onSendMessage={() => { setMatchOpen(false); navigate("/messages"); }}
                onKeepBrowsing={() => setMatchOpen(false)}
              />
            }

            <EndOfPeopleModal
                open={endOpen}
                onClose={() => setEndOpen(false)}
                onExpandArea={() => {
                    setEndOpen(false);
                    navigate("/settings?tab=distance"); 
                }}
                onDiscoverEvents={() => {
                    setEndOpen(false);
                    navigate("/events");
                }}
            />
        </div>
      );
}

export default Discover