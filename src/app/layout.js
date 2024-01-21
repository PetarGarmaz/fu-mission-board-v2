import { Inter } from "next/font/google";
import Navbar from '@components/Navbar';
import Provider from '@components/Provider';
import "@styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "FU Mission Board",
	description: "Create and schedule missions."
}

const RootLayout = ({children}) => {
  return (
	<html lang="en">
		<body>
			<Provider>
				<main className="app">
					<Navbar />
					{children}
				</main>	
			</Provider>
		</body>
	</html>
  )
}

export default RootLayout;