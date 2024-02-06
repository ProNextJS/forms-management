"use server";

export async function validateZipcode(zipcode: string): Promise<boolean> {
  console.log("validateZipcode on SERVER", zipcode);
  return /^\d{5}$/.test(zipcode) && zipcode.startsWith("9");
}
