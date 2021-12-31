import userReducer, { add,  initialState} from '../userSlice';
import { GitHubUser } from '../userModel';

describe('user reducer', () => {

  const filledState: GitHubUser = {
    user: { 
        login: "dfberry",
        id:	1517008,
        node_id: "MDQ6VXNlcjE1MTcwMDg=",
        avatar_url:	"https://avatars.githubusercontent.com/u/1517008?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/dfberry",
        html_url: "https://github.com/dfberry",
        followers_url:	"https://api.github.com/users/dfberry/followers",
        following_url:	"https://api.github.com/users/dfberry/following{/other_user}",
        gists_url:	"https://api.github.com/users/dfberry/gists{/gist_id}",
        starred_url:	"https://api.github.com/users/dfberry/starred{/owner}{/repo}",
        subscriptions_url:	"https://api.github.com/users/dfberry/subscriptions",
        organizations_url:	"https://api.github.com/users/dfberry/orgs",
        repos_url:	"https://api.github.com/users/dfberry/repos",
        events_url:	"https://api.github.com/users/dfberry/events{/privacy}",
        received_events_url:	"https://api.github.com/users/dfberry/received_events",
        type:	"User",
        site_admin:	false,
        name:	"Dina Berry",
        company:	"Microsoft",
        blog:	"https://bit.ly/3GlHtqr",
        location:	"PNW, USA",
        email:	undefined,
        hireable:	true,
        bio:	"Senior Content Developer, Full-stack JS. Write often. Learn something new.",
        twitter_username:	"dfberry",
        public_repos:	152,
        public_gists:	6,
        followers:	9,
        following:	1,
        created_at:	"2012-03-08T17:08:22Z",
        updated_at:	"2021-12-10T14:59:37Z"
    },
    token: { 
        access_token: "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",
        token_type: 'bearer',
        scope: ''
    },
    status: 'unauthenticated',
    error: undefined
  };
  test('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle add - add user data', () => {
    const actual = userReducer(initialState, add(filledState));
    expect(actual.user).toEqual(filledState.user);
  });
});
