import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React, { useEffect } from "react";

type TeamMember = {
    name: string;
    role: string;
    image: string;
};

const teamMembers: TeamMember[] = [
    {
        name: "Alice Johnson",
        role: "Project Manager",
        image: "/images/team/alice.jpg",
    },
    {
        name: "Bob Smith",
        role: "Lead Developer",
        image: "/images/team/bob.jpg",
    },
    {
        name: "Carol Lee",
        role: "UI/UX Designer",
        image: "/images/team/carol.jpg",
    },
    {
        name: "David Kim",
        role: "Backend Developer",
        image: "/images/team/david.jpg",
    },
    {
        name: "Eva Brown",
        role: "QA Engineer",
        image: "/images/team/eva.jpg",
    },
];

const Team: React.FC = () => {
    useEffect(() => {
        // Intersection observer for reveal animations
        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -100px 0px",
            }
        );
        const elements = document.querySelectorAll(".reveal-animation");
        elements.forEach((el) => observer.observe(el));
        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className="min-h-screen">
      <Header />
        <main>
            <section className="py-20 bg-white" id="team">
                <div className="section-container max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16 reveal-animation">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                            Our <span className="text-brand-accent">Team</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Meet the people who make our mission possible.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        {teamMembers.map((member, idx) => (
                            <div
                                key={member.name}
                                className="glass-panel p-6 flex flex-col items-center reveal-animation"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full object-cover mb-4 shadow"
                                />
                                <h3 className="text-xl font-bold mb-1 text-brand-dark">{member.name}</h3>
                                <p className="text-muted-foreground">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
        <Footer />
    </div>
    );
};

export default Team;