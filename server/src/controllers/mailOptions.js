const mailOptions = (email, otpCode) => {
  return {
    from: {
      name: "Mr Workout Buddy",
      address: 'rkenjaev1@gmail.com'
    },
    to: email,
    subject: "One-time verification code",
    html: `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/exercise.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Workout Buddy, a fully customizable workout app"
        />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <title>Reset your password verification code</title>
        <style>
          :root {
            --slate-50: rgb(248 250 252);
            --slate-100: rgb(241 245 249);
            --slate-200: rgb(226 232 240);
            --slate-300: rgb(203 213 225);
            --slate-400: rgb(148 163 184);
            --slate-800: rgb(30 41 59);
            --slate-900: rgb(15 23 42);
            --green-600: rgb(22 163 74);
          }
          html,
          body {
            margin: 0;
            padding: 0;
            background-color: var(--slate-50);
          }
          .wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            max-width: 32rem;
            margin: auto;
          }
          .container {
            display: flex;
            flex-direction: column;
            color: var(--slate-900);
            justify-content: center;
            align-items: center;
            background-color: var(--slate-200);
            padding: 2rem 1.5rem;
            border-radius: 1rem;
          }
          .title {
            align-self: flex-start;
            margin-left: 1rem;
            color: var(--green-600);
            font-size: 2rem;
          }
          .text {
            font-size: 1rem;
            line-height: 1.4rem;
          }
          .otp-code {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: 0.15rem;
          }
          .footer-text {
            color: var(--slate-400);
            font-size: 0.8rem;
            letter-spacing: 0.05rem;
            margin: 0.5rem 1.5rem 0 1.5rem;
            align-self: flex-start;
          }
          @media (max-width: 425px) {
            .title {
              align-self: center;
            }
            .container {
              margin: 0 1.5rem;
            }
            .footer-text {
              font-size: 0.75rem;
            }
          }
          @media (max-width: 320px) {
            .container {
              margin: 0 0.75rem;
              padding: 1.5rem 1rem;
            }
            .title {
              font-size: 1.65rem;
            }
            .text {
              font-size: 0.9rem;
            }
            .footer-text {
              font-size: 0.7rem;
            }
          }
          @media (prefers-color-scheme: dark) {
            html,
            body {
              background-color: var(--slate-900);
            }
            .container {
              background-color: var(--slate-800);
              color: var(--slate-300);
            }
            .otp-code {
              color: var(--slate-100);
            }
          }
        </style>
      </head>
      <body>
        <main class="wrapper">
          <h1 class="title">Mr Workout Buddy</h1>
          <section class="container">
            <p class="text">
              You are receiving this email because a request was made for a one-time
              code that can be used for authentication.
            </p>
            <p class="text">Please enter the following code for verification:</p>
            <span class="otp-code">${otpCode}</span>
          </section>
          <p class="footer-text">
            This message was sent from Mr Workout Buddy's creator.
          </p>
        </main>
      </body>
    </html>`,
  };
};

module.exports = mailOptions;
