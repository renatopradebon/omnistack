const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {
        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!loggedDev) {
            return res.status(400).json({ error: 'User not exists' });
        }

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        const totalLikes = await Dev.countDocuments({
            $and: [
                { _id: { $eq: targetDev } },
                { _id: { $in: loggedDev.likes } },
            ]
        });

        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('Deu match')
        }

        if (totalLikes === 0) {
            loggedDev.likes.push(targetDev._id);
            await loggedDev.save();
        }

        return res.json({ loggedDev });
    }
}