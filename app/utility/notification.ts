import twilio from "twilio";

const accountSid = "AC277ff00aef73a114d9f91f298b9398cb";
const authToken = "89ad357347461438d7c21758d4717941";

const client = twilio(accountSid, authToken);

export const GenerateAccessCode = () => {
  const code = Math.floor(10000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
  return { code, expiry };
};

export const SendVerificationCode = async (
  code: number,
  toPhoneNumber: string
) => {
  const response = await client.messages.create({
    body: `Your verification code is ${code} it will expire within 30 minutes.`,
    from: "+19189923434",
    to: toPhoneNumber.trim(),
  });
  console.log(response);
  return response;
};
