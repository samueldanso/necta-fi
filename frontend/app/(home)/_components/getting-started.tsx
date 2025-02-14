import { GETTING_STARTED_STEPS } from "@/lib/constants/home"

type Step = {
  number: number
  title: string
  description: string
}

export function GettingStarted() {
  return (
    <section
      id="steps"
      className="relative overflow-hidden bg-[#F9F4ED] py-24 sm:py-32"
    >
      <div className="container mx-auto max-w-[1150px] px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-bold text-4xl text-[#23191A] tracking-tight sm:text-5xl">
            Deposit Once, Earn Highest Yields Across Protocols
          </h2>
          <p className="text-[#23191A]/70 text-lg">
            Simply deposit USDC once and earn optimized, high-risk yields across
            multiple protocols—24/7. Getting started is really easy.
          </p>
        </div>

        <div className="relative mt-16 grid gap-6 lg:grid-cols-3 lg:gap-12">
          {GETTING_STARTED_STEPS.map((step: Step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ number, title, description }: Step) {
  return (
    <div className="flex flex-col space-y-4 rounded-lg border border-[#23191A]/10 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F29600]">
        <span className="font-semibold text-lg text-white">{number}</span>
      </div>
      <h3 className="font-bold text-[#23191A] text-xl">{title}</h3>
      <p className="text-[#23191A]/70 text-base">{description}</p>
    </div>
  )
}
