import React from "react";

const Footer = () => {
  return (
    <div>
      {" "}
      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to 10x your LinkedIn?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Connect your account. Generate your first post. Watch engagement
            explode.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth"
              className="bg-white text-indigo-600 px-12 py-6 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all shadow-2xl"
            >
              Start Free (1 min)
            </a>
            <a
              href="#demo"
              className="border-2 border-white px-12 py-6 rounded-2xl font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all"
            >
              Watch Demo
            </a>
          </div>
          <p className="mt-8 text-sm opacity-75">
            No credit card • Cancel anytime • Built by devs for devs
          </p>
        </div>
      </section>
    </div>
  );
};

export default Footer;
