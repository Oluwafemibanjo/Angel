import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { LogSnag } from "@logsnag/node";

const logsnag = new LogSnag({
  token: "LOGSNAG_TOKEN",
  project: "PROJECT_NAME",
});

const track = async () => {
  await logsnag.track({
    channel: "yes",
    event: "Will you be my girlfriend?",
    description: "She said yes!",
    icon: "💖",
    notify: true,
  });
};

function App() {
  const steps = [
    { content: "Heyyyyy, Angel.", image: "/character/four.png" },
    { content: `I’ve always liked you from afar...`, image: "/character/two.png" },
    { content: `So, I took a bold step...`, image: "/character/two.png" },
    { content: `But life has a funny way of working things out...`, image: "/character/two.png" },
    { content: `You allowed me into your space...`, image: "/character/two.png" },
    { content: `With time, my feelings grew stronger...`, image: "/character/two.png" },
    { content: `And you remember when I asked for your genotype?`, image: "/character/two.png" },
    { content: `I promise to love you as Christ commands...`, image: "/character/two.png" },
    { content: `This isn’t just a relationship—it’s a journey...`, image: "/character/two.png" },
    { content: "And so, here I am, taking a bold step...", image: "/character/six.png" },
    { content: "Angel, will you be my girlfriend?", image: "/character/seven.png" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [sheWantsToBeMyValentine, setSheWantsToBeMyValentine] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const imagePaths = [
      ...steps.map((step) => step.image),
      "/character/yayyyy.png",
    ];

    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  }, []);

  return (
    <div className={sheWantsToBeMyValentine ? "yay-background relative min-h-screen" : "custom-bg min-h-screen"}>
      {/* Black overlay for yay page */}
      {sheWantsToBeMyValentine && <div className="overlay"></div>}

      {/* Main content */}
      {!hasStarted ? (
        <div className="flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome Angel❤️</h1>
          <button
            onClick={() => setHasStarted(true)}
            className="bg-white text-pink-600 py-3 px-6 text-xl rounded-xl mt-4 font-semibold">
            Tap to Start
          </button>
        </div>
      ) : (
        <>
          <audio autoPlay loop>
            <source src="/Audio/For you.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>

          {sheWantsToBeMyValentine && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Confetti width={width} height={height} />
              <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-20">
                <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="text-white text-4xl font-bold">
                  Yayyyyyyy!!!!!
                </motion.h1>
                <img src="/character/yayyyy.png" alt="" className="w-40 animate-bounce" />
                <button
                  onClick={() => window.location.href = 'https://script.google.com/macros/s/AKfycbyIgNcfqS8A3egwCR_bAXvQNviFO1NuIe-8Orq0nj20HE3t-KFLwKsftfxmUqKaoG51/exec'}
                  className="bg-white text-pink-600 py-3 px-6 text-xl rounded-xl mt-4 font-semibold">
                  Open for a Surprise!
                </button>
              </div>
            </motion.div>
          )}

          <div className="min-h-screen text-white p-5 flex flex-col items-center justify-center max-w-md mx-auto">
            <motion.img key={currentStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} src={steps[currentStep].image} alt="" className="w-40" />
            <motion.div key={currentStep + "-text"} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="font-josefin text-4xl font-bold">
              {steps[currentStep].content}
            </motion.div>

            {currentStep < steps.length - 1 && (
              <>
                <button onClick={() => setCurrentStep(currentStep + 1)} className="bg-white text-pink-600 py-3 text-xl rounded-xl w-full mt-10 font-semibold">Next</button>
                {currentStep > 0 && (
                  <button onClick={() => setCurrentStep(currentStep - 1)} className="bg-white text-pink-600 py-3 text-xl rounded-xl w-full mt-2 font-semibold opacity-90">Back</button>
                )}
              </>
            )}

            {currentStep === steps.length - 1 && (
              <button onClick={async () => {
                try {
                  setSheWantsToBeMyValentine(true);
                  await track();
                } catch (error) {
                  console.error("Error tracking response:", error);
                }
              }} className="bg-white text-pink-600 py-3 text-xl rounded-xl w-full mt-10 font-semibold">
                Yes
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
