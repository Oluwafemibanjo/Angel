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
    {
      content: "Heyyyyy, Angel.",
      image: "/character/one.png",
    },
    {
      content: `I’ve always liked you from afar. I wasn’t sure what it was, but something in me just knew—I needed to know you.`,
      image: "/character/two.png",
    },
    {
      content: `So, I took a bold step. I asked for your contact, and even made my intentions known… but, well, I got turned down (ouch, lol).`,
      image: "/character/two.png",
    },
    {
      content: `But life has a funny way of working things out, and somehow, we became friends. And since then, it’s been nothing short of bliss.`,
      image: "/character/two.png",
    },
    {
      content: `You allowed me into your space, and every moment since, all I can think of is "Angel"❤️.`,
      image: "/character/two.png",
    },
    {
      content: `With time, my feelings grew stronger, and now, more than ever, I know this is real. This isn’t just a fleeting emotion—it’s something deeper, something certain.`,
      image: "/character/two.png",
    },
    {
      content: `And you remember when I asked for your genotype? Yeah… that wasn’t just curiosity. That was me checking our compatibility for the future, because I see a future with you.`,
      image: "/character/two.png",
    },
    {
      content: `I promise to love you as Christ commands. I promise to always stand by you. I promise to be your number one fan.`,
      image: "/character/two.png",
    },
    {
      content: `This isn’t just a relationship—it’s a journey. A journey to know Christ more and to make Him known through our union.`,
      image: "/character/two.png",
    },
    {
      content: "And so, here I am, taking a bold step...",
      image: "/character/six.png",
    },
    {
      content: "Angel, will you be my girlfriend?",
      image: "/character/seven.png",
    },
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

  if (!hasStarted) {
    return (
      <div className="bg-[#FFC5D3] min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome Angel❤️</h1>
        <button
          onClick={() => setHasStarted(true)}
          className="bg-white text-[#FFC5D3] py-2 px-6 text-lg rounded-xl font-semibold"
        >
          Tap to Start
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[url('/public/IMG_6170.jpeg')] bg-cover bg-center">
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <audio autoPlay loop>
        <source src="/Audio/For you.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {sheWantsToBeMyValentine && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Confetti width={width} height={height} />
          <div className="fixed top-0 left-0 w-full h-full bg-[#FFC5D3] flex flex-col items-center justify-center">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-white text-4xl font-bold"
            >
              Yayyyyyyy!!!!!
            </motion.h1>
            <img
              src="/character/yayyyy.png"
              alt=""
              className="w-40 animate-bounce"
            />

            <button
              onClick={() =>
                (window.location.href =
                  "https://script.google.com/macros/s/AKfycbyIgNcfqS8A3egwCR_bAXvQNviFO1NuIe-8Orq0nj20HE3t-KFLwKsftfxmUqKaoG51/exec")
              }
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-10 font-semibold"
            >
              Open for a Surprise!
            </button>
          </div>
        </motion.div>
      )}

      <div className="bg-[#FFC5D3] min-h-screen text-white p-5 flex flex-col items-center justify-center max-w-md mx-auto">
        <motion.img
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={steps[currentStep].image}
          alt=""
          className="w-40"
        />
        <motion.div
          key={currentStep + "-text"}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-josefin text-4xl font-bold"
        >
          {steps[currentStep].content}
        </motion.div>

        {currentStep < steps.length - 1 && (
          <div>
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-10 font-semibold"
            >
              Next
            </button>
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-2 font-semibold opacity-90"
              >
                Back
              </button>
            )}
          </div>
        )}

        {currentStep === steps.length - 1 && (
          <button
            onClick={async () => {
              try {
                setSheWantsToBeMyValentine(true);
                await track();
              } catch (error) {
                console.error("Error tracking response:", error);
              }
            }}
            className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-10 font-semibold"
          >
            Yes
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
