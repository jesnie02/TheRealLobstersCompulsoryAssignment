

const jobs = [
    { id: 1, title: 'Paper Technician', description: 'Responsible for maintenance of paper production machinery.' },
    { id: 2, title: 'Production Manager', description: 'Overseeing production lines for paper products.' },
    { id: 3, title: 'Quality Control Specialist', description: 'Ensuring product quality and compliance with standards.' },
    { id: 4, title: 'Purchasing Manager', description: 'Procurement of raw materials for paper production.' },
    { id: 5, title: 'Logistics Coordinator', description: 'Planning deliveries and distribution logistics.' },
];

const JobList = () => {
    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-6">Open Positions at Lobster Corporation</h1>
            <div className="grid grid-cols-1 gap-6">
                {jobs.map(job => (
                    <div key={job.id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{job.title}</h2>
                            <p>{job.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Apply</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobList;
