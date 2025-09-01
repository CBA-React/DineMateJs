import { Select } from "../ui/Select";

export const LocationSelect = ({ inputProps, error = "", className = "" }) => {
  const locationOptions = [
    { value: "new-york-ny", label: "New York, NY" },
    { value: "los-angeles-ca", label: "Los Angeles, CA" },
    { value: "chicago-il", label: "Chicago, IL" },
    { value: "houston-tx", label: "Houston, TX" },
    { value: "phoenix-az", label: "Phoenix, AZ" },
    { value: "philadelphia-pa", label: "Philadelphia, PA" },
    { value: "san-antonio-tx", label: "San Antonio, TX" },
    { value: "san-diego-ca", label: "San Diego, CA" },
    { value: "dallas-tx", label: "Dallas, TX" },
    { value: "san-jose-ca", label: "San Jose, CA" },
    { value: "austin-tx", label: "Austin, TX" },
    { value: "jacksonville-fl", label: "Jacksonville, FL" },
    { value: "fort-worth-tx", label: "Fort Worth, TX" },
    { value: "columbus-oh", label: "Columbus, OH" },
    { value: "charlotte-nc", label: "Charlotte, NC" },
    { value: "san-francisco-ca", label: "San Francisco, CA" },
    { value: "indianapolis-in", label: "Indianapolis, IN" },
    { value: "seattle-wa", label: "Seattle, WA" },
    { value: "denver-co", label: "Denver, CO" },
    { value: "washington-dc", label: "Washington, DC" },
    { value: "boston-ma", label: "Boston, MA" },
    { value: "el-paso-tx", label: "El Paso, TX" },
    { value: "nashville-tn", label: "Nashville, TN" },
    { value: "detroit-mi", label: "Detroit, MI" },
    { value: "oklahoma-city-ok", label: "Oklahoma City, OK" },
    { value: "portland-or", label: "Portland, OR" },
    { value: "las-vegas-nv", label: "Las Vegas, NV" },
    { value: "memphis-tn", label: "Memphis, TN" },
    { value: "louisville-ky", label: "Louisville, KY" },
    { value: "baltimore-md", label: "Baltimore, MD" },
    { value: "milwaukee-wi", label: "Milwaukee, WI" },
    { value: "albuquerque-nm", label: "Albuquerque, NM" },
    { value: "tucson-az", label: "Tucson, AZ" },
    { value: "fresno-ca", label: "Fresno, CA" },
    { value: "sacramento-ca", label: "Sacramento, CA" },
    { value: "mesa-az", label: "Mesa, AZ" },
    { value: "kansas-city-mo", label: "Kansas City, MO" },
    { value: "atlanta-ga", label: "Atlanta, GA" },
    { value: "long-beach-ca", label: "Long Beach, CA" },
    { value: "colorado-springs-co", label: "Colorado Springs, CO" },
    { value: "raleigh-nc", label: "Raleigh, NC" },
    { value: "miami-fl", label: "Miami, FL" },
    { value: "virginia-beach-va", label: "Virginia Beach, VA" },
    { value: "omaha-ne", label: "Omaha, NE" },
    { value: "oakland-ca", label: "Oakland, CA" },
    { value: "minneapolis-mn", label: "Minneapolis, MN" },
    { value: "tulsa-ok", label: "Tulsa, OK" },
    { value: "arlington-tx", label: "Arlington, TX" },
    { value: "tampa-fl", label: "Tampa, FL" }
  ];

  return (
    <Select
      label="LOCATION"
      placeholder="City, state"
      options={locationOptions}
      inputProps={inputProps}
      error={error}
      className={className}
      required={true}
    />
  );
};