import React from "react";
import data from "../../data/index.json";
import Headling from "../../composents/Headling/Headling";
import SkillsSection from "../../composents/SkillsSection/SkillsSection";
export default function MySkills() {
  return (
    <>
      <section className="skillsSection w-full  my-5 mx-auto ">
        <div className=" header_skills px-20 ">
          <SkillsSection />
        </div>
      </section>
    </>
  );
}
