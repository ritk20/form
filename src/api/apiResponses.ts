interface FormField {
  name: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

interface FormStructure {
  fields: FormField[];
}

const apiResponses: Record<string, FormStructure> = {
  "User Information": {
    fields: [
      { name: "username", type: "text", label: "Username", required: true },
      { name: "email", type: "email", label: "Email", required: true },
      { name: "phoneNumber", type: "text", label: "Phone Number", required: false },
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
      { name: "age", type: "number", label: "Age", required: false },
    ],
  },
  "Address Information": {
    fields: [
      { name: "street", type: "text", label: "Street", required: true },
      { name: "city", type: "text", label: "City", required: true },
      {
        name: "state",
        type: "dropdown",
        label: "State",
        options: [
          "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
          "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
          "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
          "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
          "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
        ],
        required: true,
      },
      { name: "zipCode", type: "text", label: "Zip Code", required: false },
    ],
  },
  "Payment Information": {
    fields: [
      { name: "cardNumber", type: "text", label: "Card Number", required: true },
      { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
      { name: "cvv", type: "password", label: "CVV", required: true },
      { name: "cardholderName", type: "text", label: "Cardholder Name", required: true },
    ],
  },
  "Employment Information": {
    fields: [
      { name: "companyName", type: "text", label: "Company Name", required: true },
      { name: "jobTitle", type: "text", label: "Job Title", required: true },
      { name: "yearsExperience", type: "number", label: "Years of Experience", required: false },
      { name: "employmentType", type: "dropdown", label: "Employment Type", options: ["Full-time", "Part-time", "Contract"], required: true },
    ],
  },
  "Emergency Contact": {
    fields: [
      { name: "contactName", type: "text", label: "Contact Name", required: true },
      { name: "relationship", type: "text", label: "Relationship", required: true },
      { name: "contactNumber", type: "text", label: "Contact Number", required: true },
      { name: "alternateNumber", type: "text", label: "Alternate Number", required: false },
    ],
  }
};

export default apiResponses;