import { useState, useEffect } from "react";

export const useGitHubData = (username) => {
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchGitHubStats = async () => {
      try {
        setLoading(true);
        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
        );

        if (!repoRes.ok) {
          throw new Error(`GitHub API returned ${repoRes.status}`);
        }

        const repoData = await repoRes.json();

        if (isMounted) {
          setRepos(repoData);
        }

        const eventsRes = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=10`,
        );

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          const extractedCommits = [];

          eventsData.forEach((event) => {
            if (event.type === "PushEvent" && event.payload?.commits) {
              event.payload.commits.forEach((c) => {
                if (extractedCommits.length < 5) {
                  extractedCommits.push({
                    sha: c.sha.substring(0, 7),
                    message: c.message,
                    repoName: event.repo.name,
                    date: event.created_at,
                    url: `https://github.com/${event.repo.name}/commit/${c.sha}`,
                  });
                }
              });
            }
          });

          if (isMounted) {
            setCommits(extractedCommits);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to fetch GitHub data");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGitHubStats();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { repos, commits, loading, error };
};
