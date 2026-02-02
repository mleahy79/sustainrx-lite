import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const Analyze = () => {
    const [searchParams] = useSearchParams();
    const repoUrl = searchParams.get('repo');

    const [repoInfo, setRepoInfo] = useState(null);
    const [commits, setCommits] = useState([]);
    const [contributors, setContributors] = useState([]);
    const [languages, setLanguages] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
        if (!repoUrl) {
            setError("No repository URL provided");
            setLoading(false);
            return;
        }
    
        try {
           const { owner, repo } = parseGitHubUrl(repoUrl);
           //fetch all data here
           const [repoData, commitsData, contributorsData, languagesData, issuesData] = await Promise.all([
            fetchRepoInfo(owner, repo),
            fetchCommits(owner, repo),
            fetchContributors(owner, repo),
            fetchLanguages(owner, repo),
            fetchIssues(owner, repo)
           ]);
    
           setRepoInfo(repoData);
           setCommits(commitsData);
           setContributors(contributorsData);
           setLanguages(languagesData);
           setIssues(issuesData);
        } catch (err) {
           setError(err.message || "Failed to fetch repository data");
        } finally {
           setLoading(false);
        }
      }
    
      fetchData();
    }, [repoUrl]);
    if (loading) {
    return (
    <div className='min-h-screen flex justify-center items-center bg-radial-[at_bottom] from-[#178582] via-neutral-800 to-[#0a1828] min-h-screen overflow-hidden'>
        <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#178582] mx-auto mb-4">
                <p className="text-gray-300">Analyzing repository...</p>
            </div>
        </div>
    </div>
  )}
if (error) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-radial-[at_bottom] from-[#178582] via-neutral-800 to-[#0a1828] min-h-screen overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className='bg-red-900/30 border border-red-500 rounded-lg p-6'>
        <h2 className='text-red-400 font-semibold mb-2'>Diagnosis Failed</h2>
        <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    </div>
  )
}
return (
    <div className="min-h-screen flex justify-center items-center bg-radial-[at_bottom] from-[#178582] via-neutral-800 to-[#0a1828] min-h-screen overflow-hidden">
    <div className="max-w-6xl mx-auto px-4 py-8">
        {repoInfo && (<div className='bg-neutral-800/30 border border-neutral-600 rounded-lg p-6 mb-6'>
            <h2 className='text-xl font-bold text-[#bfa174] mb-2'>Repository: {repoInfo.full_name}</h2>
            <p className='text-[#178582] mb-1'>{repoInfo.description}</p>
            <p className='text-gray-400 text-sm'>⭐ Stars: {repoInfo.stargazers_count} | 🍴 Forks: {repoInfo.forks_count} | 🐛 Open Issues: {repoInfo.open_issues_count}</p>
        </div>)}
        <div className='bg-neutral-800/30 border border-neutral-600 rounded-lg p-6 mb-6'>
            <h3 className='text-lg font-bold text-[#bfa174] mb-4'>Commit History</h3>
            <ul className='max-h-64 overflow-y-auto'>
                {commits.map((commit) => (
                    <li key={commit.sha} className='mb-2 border-b border-neutral-600 pb-2'>
                        <p className='text-[#178582]'><strong>{commit.commit.author.name}</strong> - {new Date(commit.commit.author.date).toLocaleDateString()}</p>
                        <p className='text-gray-400 text-sm'>{commit.commit.message}</p>
                    </li>
                ))}
            </ul>
        </div>
        <div className='bg-neutral-800/30 border border-neutral-600 rounded-lg p-6 mb-6'>
            <h3 className='text-lg font-bold text-[#bfa174] mb-4'>Top Contributors</h3>
            <ul>
                {contributors.map((contributor) => (
                    <li key={contributor.id} className='mb-2'>
                        <p className='text-gray-400'><strong>{contributor.login}</strong> - Contributions: {contributor.contributions}</p>
                    </li>
                ))}
            </ul>
        </div>
        <div className='bg-neutral-800/30 border border-neutral-600 rounded-lg p-6 mb-6'>
            <h3 className='text-lg font-bold text-[#bfa174] mb-4'>Languages Used</h3>
            <ul>
                {Object.entries(languages).map(([language, bytes]) => (
                    <li key={language} className='mb-2'>
                        <p className='text-gray-400'><strong>{language}</strong>: {bytes} bytes</p>
                    </li>
                ))}
            </ul>
        </div>
        <div className='bg-neutral-800/30 border border-neutral-600 rounded-lg p-6 mb-6'>
            <h3 className='text-lg font-bold text-[#bfa174] mb-4'>Open Issues</h3>
            <ul className='max-h-64 overflow-y-auto'>   
                {issues.map((issue) => (
                    <li key={issue.id} className='mb-2 border-b border-neutral-600 pb-2'>
                        <p className='text-[#178582]'><strong>{issue.title}</strong></p>
                        <p className='text-gray-400 text-sm'>{issue.body}</p>
                    </li>
                ))}
            </ul>
        </div>  
    </div>
    </div>

);
}

function parseGitHubUrl(url) {
    const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\/|$)/;
    const match = url.match(regex);
    if (!match) {
        throw new Error("Invalid GitHub repository URL");
    }
    return { owner: match[1], repo: match[2] };
}

async function fetchRepoInfo(owner, repo) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!response.ok) {
        throw new Error("Failed to fetch repository info");
    }
    return await response.json();
}

async function fetchCommits(owner, repo) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`);
    if (!response.ok) {
        throw new Error("Failed to fetch commits");
    }
    return await response.json();
}

async function fetchContributors(owner, repo) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=5`);
    if (!response.ok) {
        throw new Error("Failed to fetch contributors");
    }
    return await response.json();
}

async function fetchLanguages(owner, repo) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
    if (!response.ok) {
        throw new Error("Failed to fetch languages");
    }
    return await response.json();
}

async function fetchIssues(owner, repo) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=open&per_page=10`);
    if (!response.ok) {
        throw new Error("Failed to fetch issues");
    }
    return await response.json();
}


export default Analyze
