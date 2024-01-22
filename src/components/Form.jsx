'use client';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({type, briefing, setBriefing, handleSubmit, startDate, setStartDate, allBriefings}) => {
	const getDisabledDates = (date) => {
		var dateIsAvailable = true;

		const day = date.getDay();
		const dayInMonth = date.getDate();
		const month = date.getMonth();
		const year = date.getYear();

		for (let i = 0; i < allBriefings.length; i++) {
			var postDate = new Date(parseInt(allBriefings[i].timestamp));

			var postDay = postDate.getDay();
			var postDayInMonth = postDate.getDate();
			var postMonth = postDate.getMonth();
			var postYear = postDate.getYear();

			if(postDay == day && postDayInMonth == dayInMonth && postMonth == month && postYear == year) {
				dateIsAvailable = false;
			}
		};
		
		return day == 5 && dateIsAvailable;
	}

	const handleDescription = (e) => {
		e.target.style.height = 'inherit';
		e.target.style.height = `${e.target.scrollHeight}px`;
		setBriefing ({...briefing, desc: e.target.value});
	}
	
	return (
		<section className="flex">
			<div className="flex flex-col w-9/12 mx-auto max-lg:w-11/12">
				<header className="flex flex-col bg-gray-900 mt-10 border border-gray-600 rounded-lg">
					<h1 className='text-5xl text-gray-200 font-bold tracking-widest text-center my-4 max-lg:text-3xl max-lg:tracking-normal'>{type.toUpperCase()} BRIEFING</h1>
					<hr className='border-gray-600'/>
					<p className='text-gray-200 text-center max-lg:text-sm tracking-wider italic my-4 mx-4'>{type == "Create" ? "Create a briefing for an upcoming mission." : "Edit an existing mission briefing."}</p>

				</header>
			
				<form onSubmit={handleSubmit} className="flex flex-col bg-gray-900 my-10 border border-gray-600 rounded-lg">
					<label className="m-5">
						<h3 className="text-2xl text-gray-200 tracking-wider mb-2">Title:</h3>
						<textarea value={briefing.title} onChange={(e) => setBriefing ({...briefing, title: e.target.value})} placeholder="Desert Storm, Thunder, Sword, etc..." required maxLength={50} rows={1} className="flex text-gray-200 tracking-wider lg:text-lg bg-gray-800 border border-gray-600 hover:bg-gray-700 rounded-lg resize-none py-1 px-2 w-full transition duration-300"/>
					</label>

					<label className="m-5">
						<h3 className="text-2xl text-gray-200 tracking-wider mb-2">Host:</h3>
						<textarea value={briefing.host} onChange={(e) => setBriefing ({...briefing, host: e.target.value})} placeholder="Warlord Beezo, Slobodan Beast, etc..." required maxLength={30} rows={1} className="flex text-gray-200 tracking-wider lg:text-lg bg-gray-800 border border-gray-600 hover:bg-gray-700 rounded-lg resize-none py-1 px-2 w-full transition duration-300"/>
					</label>

					<label className="m-5">
						<h3 className="text-2xl text-gray-200 tracking-wider mb-2">Date:</h3>
						<DatePicker selected={startDate} filterDate={(date) => getDisabledDates(date)} minDate={new Date()} onChange={(date) => setStartDate(date)} className="mx-auto text-gray-200 tracking-wider lg:text-lg bg-gray-800 border border-gray-600 hover:bg-gray-700 rounded-lg py-1 px-2 transition duration-300"/>
					</label>

					<label className="m-5">
						<h3 className="text-2xl text-gray-200 tracking-wider mb-2">Description:</h3>
						<textarea value={briefing.desc} onChange={(e) => handleDescription(e)} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non sem fringilla, malesuada nibh sit amet, mollis nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam varius eu mi in pellentesque. Maecenas a dolor vel enim volutpat." required rows={2} className="flex resize-none text-gray-200 tracking-wider lg:text-lg text-justify bg-gray-800 border border-gray-600 hover:bg-gray-700 rounded-lg py-1 px-2 w-full transition duration-300"/>
					</label>

					<label className="m-5">
						<h3 className="text-2xl text-gray-200 tracking-wider mb-2">Status:</h3>
						<textarea value={briefing.status} onChange={(e) => setBriefing ({...briefing, status: e.target.value})} placeholder="Unknown, Completed, Failed, etc..." required maxLength={30} rows={1} className="flex text-gray-200 tracking-wider lg:text-lg bg-gray-800 border border-gray-600 hover:bg-gray-700 rounded-lg resize-none py-1 px-2 w-full transition duration-300"/>
					</label>

					<label className="m-5">
						<h3 className="text-2xl text-gray-200 tracking-wider mb-2">Image (Optional):</h3>
						<textarea value={briefing.image} onChange={(e) => setBriefing ({...briefing, image: e.target.value})} placeholder="Insert image link here..." rows={2} className="flex text-gray-200 tracking-wider lg:text-lg bg-gray-800 border border-gray-600 hover:bg-gray-700 rounded-lg resize-none py-1 px-2 w-full transition duration-300"/>
					</label>

					{briefing.image && (
						<img src={briefing.image} alt="briefing_image" className="m-5 rounded-lg"/>
					)}

					<button type='submit' className="flex m-auto my-5 py-1 px-6 text-gray-200 tracking-wider text-2xl bg-red-600 hover:bg-red-400 rounded-lg transition duration-300">
						{type == "Create" ? "Create Briefing" : "Edit Briefing"}
					</button>
				</form>
			</div>

		</section>
	)
}

export default Form
