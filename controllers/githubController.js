const db = require("../config/db");
const { getGithubProfile } = require("../services/githubService");

const analyzeProfile = async(req,res)=>{

    try{

        const username = req.params.username;

        const data = await getGithubProfile(username);

        const values = [
            data.login,
            data.name,
            data.public_repos,
            data.followers,
            data.following,
            data.public_gists,
            data.created_at.substring(0,10),
            data.html_url,
            data.avatar_url
        ];

        const sql = `
        INSERT INTO github_profiles
        (username,name,public_repos,followers,following,public_gists,account_created,profile_url,avatar_url)
        VALUES (?,?,?,?,?,?,?,?,?)
        ON DUPLICATE KEY UPDATE
        name=VALUES(name),
        public_repos=VALUES(public_repos),
        followers=VALUES(followers),
        following=VALUES(following),
        public_gists=VALUES(public_gists),
        account_created=VALUES(account_created),
        profile_url=VALUES(profile_url),
        avatar_url=VALUES(avatar_url),
        analyzed_at=CURRENT_TIMESTAMP
        `;

        db.query(sql,values,(err)=>{
            if(err) return res.status(500).json(err);

            res.json({
                message:"Profile analyzed successfully",
                data
            });
        });

    }

    catch(err){

        res.status(404).json({
            message:"GitHub user not found"
        });

    }

}

const getProfiles=(req,res)=>{

    db.query(
        "SELECT * FROM github_profiles ORDER BY analyzed_at DESC",
        (err,result)=>{

            if(err) return res.status(500).json(err);

            res.json(result);

        }
    )

}

const getSingleProfile=(req,res)=>{

    db.query(
        "SELECT * FROM github_profiles WHERE username=?",
        [req.params.username],
        (err,result)=>{

            if(err) return res.status(500).json(err);

            if(result.length===0){

                return res.status(404).json({
                    message:"Not found"
                });

            }

            res.json(result[0]);

        }
    )

}

module.exports={
    analyzeProfile,
    getProfiles,
    getSingleProfile
}