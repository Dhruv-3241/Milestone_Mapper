import React from "react";
import styles from "./HomePage.module.css";
import img1 from "../../assets/pic1-updated.png";
import create1 from "../../assets/icons8-create-30.png";
import update1 from "../../assets/icons8-update-64.png";
import delete1 from "../../assets/icons8-delete-24.png";
import view1 from "../../assets/icons8-view-24.png";
import viewall from "../../assets/icons8-view-all-50.png";
import wallet from "../../assets/icons8-wallet-50.png";
import settings from "../../assets/icons8-setting-50.png";
import help from "../../assets/icons8-help-50.png";
import Lottie from "lottie-react";
import animationData from "../../assets/animation.json";
import { useRef } from "react";

const HomePage = () => {
  const animationRef = useRef(null);
  return (
    <section id="about">
      <div className={styles.container}>
        <div className={styles.leftnav}>
          <div className={styles.part1}>
            <div className={styles.logoimg}>
              <img src={img1} alt="logo" />
            </div>
          </div>
          <div className={styles.part2}>
            <div className={styles.section}>
              <div className={styles.page1}>
                <strong>Overview</strong>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.icon}>
                <img src={wallet} alt="icon" />
              </div>
              <div className={styles.page}>
                <a href="http://localhost:5173/wallet" className={styles.hbtn}>
                  <p>Wallet</p>
                </a>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.icon}>
                <img src={create1} alt="icon" />
              </div>
              <div className={styles.page}>
                <a
                  href="http://localhost:5173/create-task"
                  className={styles.hbtn}
                >
                  <p>Create Task</p>
                </a>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.icon}>
                <img src={update1} alt="icon" />
              </div>
              <div className={styles.page}>
                <a
                  href="http://localhost:5173/update-task"
                  className={styles.hbtn}
                >
                  <p>Update Task</p>
                </a>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.icon}>
                <img src={delete1} alt="icon" />
              </div>
              <div className={styles.page}>
                <a
                  href="http://localhost:5173/delete-task"
                  className={styles.hbtn}
                >
                  <p>Delete Task</p>
                </a>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.icon}>
                <img src={view1} alt="icon" />
              </div>
              <div className={styles.page}>
                <a
                  href="http://localhost:5173/view-task"
                  className={styles.hbtn}
                >
                  <p>View Task</p>
                </a>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.icon}>
                <img src={viewall} alt="icon" />
              </div>
              <div className={styles.page}>
                <a
                  href="http://localhost:5173/view-all-tasks"
                  className={styles.hbtn}
                >
                  <p>View All</p>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.part3}>
            <div className={styles.title}>
              <h3>Options</h3>
            </div>
            <div className={styles.options}>
              <ul>
                <li>
                  <img className={styles.help} src={help} alt="" />
                  <p> Help </p>
                </li>
                <li>
                  <img src={settings} alt="" />
                  <p> Settings </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.headline}>
            <p>Milestone Mapper</p>
          </div>
          <div className={styles.tagline}>
            <p>
              Empower Your Projects, Simplify Your Management: Your Project
              Success Starts Here!
            </p>
          </div>
          <div className={styles.animation}>
            <div className={styles.rightpart}>
              <Lottie
                onComplete={() => {
                  animationRef.current?.setDirection(-1);
                  animationRef.current?.play();
                }}
                lottieref={animationRef}
                loop={true}
                animationData={animationData}
              />
            </div>
            <div className={styles.leftpart}>
              {/* <div className={styles.aboutus}>
                <h2> About Us </h2>
                <p>
                  Milestone Mapper revolutionizes project management by
                  seamlessly integrating planning, tracking, and collaboration.
                  This intuitive app turns complex projects into manageable
                  tasks, ensuring deadlines are met with precision. It's
                  designed for teams seeking clarity and efficiency, making
                  every milestone within reach through real-time updates and
                  customizable workflows.
                </p>
              </div> */}
              <div className={styles.link}>
                <p>
                  Let's turn complex projects into manageable tasks and ensure
                  deadlines are met with precision.
                </p>
                <p>Click on the button below to start your managing tasks</p>
                <a href="http://localhost:5173/wallet">
                  <button className={styles.btn}> Get Started</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
