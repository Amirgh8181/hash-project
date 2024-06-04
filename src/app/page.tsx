
import AESExample from "@/hashalgorithm/Aes";
import DESExample from "@/hashalgorithm/Des";
import ElGamal from "@/hashalgorithm/Elgamal";
import MD5Algorithm from "@/hashalgorithm/Md5";
import RSAExample from "@/hashalgorithm/Rsa";
import SHAExample from "@/hashalgorithm/Sha";

export default function Home() {
  return (
    <div>

      <MD5Algorithm />
      <AESExample />
      <DESExample />
      <SHAExample />
      <RSAExample />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <ElGamal />
    </div>
  );
}
