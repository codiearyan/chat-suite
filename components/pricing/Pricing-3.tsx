export default function Pricing() {
  const pricingInfo = [
    {
      title: "Free",
      description: "Perfect for trying out our AI chat capabilities.",
      price: "₹0",
      period: "/50 credits",
      features: [
        "Access to basic AI chat features",
        "Up to 50 message exchanges",
        "Standard response time",
        "Basic file attachments",
        "Community support",
      ],
      special: false,
      buttonText: "Start Free",
    },
    {
      title: "Basic",
      description: "Ideal for professionals and small teams.",
      price: "₹399",
      period: "/100 credits",
      features: [
        "All Free features, plus:",
        "Faster response times",
        "Advanced AI capabilities",
        "Priority email support",
        "Enhanced file handling",
      ],
      special: true,
      buttonText: "Upgrade to Basic",
    },
    {
      title: "Premium",
      description: "For power users who need unlimited access.",
      price: "₹999",
      period: "/500 credits",
      features: [
        "All Basic features, plus:",
        "Unlimited message exchanges",
        "Fastest response times",
        "24/7 priority support",
        "Custom AI model fine-tuning",
      ],
      special: false,
      buttonText: "Go Premium",
    },
  ];

  return (
    <>
      <div
        id="pricing"
        className="mx-auto px-4 py-24 sm:px-6 lg:px-8 w-full gap-16 sm:gap-y-24 flex flex-col bg-background"
      >
        <div className="text-center flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-display">
            Choose Your Plan
          </h2>
          <h3 className="text-lg tracking-tight text-muted-foreground sm:text-lg mt-5 sm:mt-3 max-w-2xl">
            Select the perfect plan for your needs. Upgrade or downgrade anytime
            as your requirements change.
          </h3>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-3 w-full justify-center items-center gap-8">
          {pricingInfo.map((info, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-lg bg-white relative flex flex-col w-full ${
                info.special
                  ? "border-2 border-primary lg:scale-[1.02] lg:z-10"
                  : "border border-neutral-200"
              }`}
            >
              {info.special && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="flex-1 gap-6 lg:gap-x-8 xl:gap-x-10 flex flex-col sm:p-6 p-6 lg:p-8 xl:p-10">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-2xl text-base-content sm:text-3xl font-bold truncate font-display">
                      {info.title}
                    </p>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-600 mt-2">
                    {info.description}
                  </p>
                </div>
                <div className="flex flex-row items-baseline gap-x-1">
                  <p className="text-base-content text-2xl sm:text-4xl font-bold">
                    {info.price}
                  </p>
                  <p className="text-neutral-600 text-sm font-medium">
                    {info.period}
                  </p>
                </div>
                <button
                  className={`px-4 py-2.5 text-sm font-semibold rounded-lg text-center transition-all duration-200 ${
                    info.special
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                  }`}
                >
                  {info.buttonText}
                </button>
                <div className="flex-1">
                  <ul className="space-y-3 text-sm">
                    {info.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-x-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`w-5 h-5 flex-shrink-0 ${
                            info.special ? "text-primary" : "text-neutral-700"
                          }`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
