const jainQuotes = [
    {
        id: 1,
        text: "Live and let live. Love all - Serve all.",
        source: "Lord Mahavira"
    },
    {
        id: 2,
        text: "Non-violence is the highest religion.",
        source: "Lord Mahavira"
    },
    {
        id: 3,
        text: "A man is seated on top of a tree in the midst of a burning forest. He sees all living beings perishing. But he doesn't realize that the same fate is soon to overtake him also. That man is none other than the fool who thinks that this world is permanent.",
        source: "Lord Mahavira"
    },
    {
        id: 4,
        text: "In happiness and suffering, in joy and grief, we should regard all creatures as we regard our own self.",
        source: "Lord Mahavira"
    },
    {
        id: 5,
        text: "Do not injure, abuse, oppress, enslave, insult, torment, torture, or kill any creature or living being.",
        source: "Lord Mahavira"
    },
    {
        id: 6,
        text: "Limit your possessions and limit your desires.",
        source: "Jain Wisdom"
    },
    {
        id: 7,
        text: "The soul comes alone and goes alone, no one accompanies it and it has no friends.",
        source: "Lord Mahavira"
    },
    {
        id: 8,
        text: "Anger begets more anger, and forgiveness and love lead to more forgiveness and love.",
        source: "Lord Mahavira"
    },
    {
        id: 9,
        text: "One who neglects or disregards the existence of earth, air, fire, water and vegetation disregards his own existence which is entwined with them.",
        source: "Lord Mahavira"
    },
    {
        id: 10,
        text: "It is better to win over the self than to win over a million enemies.",
        source: "Lord Mahavira"
    },
    {
        id: 11,
        text: "The greatest mistake of a soul is non-recognition of its real self and can only be corrected by recognizing itself.",
        source: "Acharya Kundakunda"
    },
    {
        id: 12,
        text: "There is no enemy out of your soul. The real enemies live inside your soul, they are anger, pride, greed, attachment and hate.",
        source: "Lord Mahavira"
    },
    {
        id: 13,
        text: "Silence and self-control is non-violence.",
        source: "Lord Mahavira"
    },
    {
        id: 14,
        text: "Respect for all living beings is non-violence.",
        source: "Lord Mahavira"
    },
    {
        id: 15,
        text: "Ahimsa Parmo Dharma (Non-violence is the supreme religion).",
        source: "Jain Proverb"
    },
    {
        id: 16,
        text: "Just as sword cannot cut the fire, so the weapons cannot destroy the soul.",
        source: "Bhagavad Gita (Shared Wisdom)"
    },
    {
        id: 17,
        text: "If you want to cultivate a habit, do it without any reservation, till it is firmly established in your character.",
        source: "Lord Mahavira"
    },
    {
        id: 18,
        text: "Only that which cleanses the soul is right knowledge.",
        source: "Jain Wisdom"
    },
    {
        id: 19,
        text: "Do not deprive someone of his livelihood. This is a sinful tendency.",
        source: "Lord Mahavira"
    },
    {
        id: 20,
        text: "All souls are alike and potentially divine. None is superior or inferior.",
        source: "Jain Philosophy"
    },
    {
        id: 21,
        text: "Have compassion towards all living beings. Hatred leads to destruction.",
        source: "Lord Mahavira"
    },
    {
        id: 22,
        text: "Every soul is in itself absolutely omniscient and blissful. The bliss does not come from outside.",
        source: "Acharya Kundakunda"
    },
    {
        id: 23,
        text: "Attachment and aversion are the root cause of karma, and karma is the root cause of birth and death.",
        source: "Jain Philosophy"
    },
    {
        id: 24,
        text: "By forgiveness, the soul is purified.",
        source: "Uttaradhyayana Sutra"
    },
    {
        id: 25,
        text: "Knowledge without right conduct is futile.",
        source: "Jain Wisdom"
    },
    {
        id: 26,
        text: "The essence of wisdom is not to kill anything.",
        source: "Sutrakritanga"
    },
    {
        id: 27,
        text: "Can you hold a red-hot iron rod in your hand merely because some one wants you to do so? Then, will it be right on your part to ask others to do the same thing just to satisfy your desires?",
        source: "Lord Mahavira"
    },
    {
        id: 28,
        text: "A man who desires to get liberation should not have any attachment for the body.",
        source: "Lord Mahavira"
    },
    {
        id: 29,
        text: "The body is the boat, the soul is the sailor, and the ocean of samsara is what we must cross.",
        source: "Jain Metaphor"
    },
    {
        id: 30,
        text: "Micchami Dukkadam - May all the evil that has been done be fruitless.",
        source: "Forgiveness Mantra"
    },
    {
        id: 31,
        text: "Parasparopagraho Jivanam – Souls render service to one another.",
        source: "Tattvartha Sutra"
    },
    {
        id: 32,
        text: "Don't accumulate if you do not need. The excess of wealth in your hands is for the society, and you are the trustee for the same.",
        source: "Jain Economic Principle"
    },
    {
        id: 33,
        text: "One who conquers his own self is a greater conqueror than one who conquers a thousand enemies in battle.",
        source: "Dhammapada (Shared Wisdom)"
    },
    {
        id: 34,
        text: "Faith, Knowledge, and Conduct together constitute the path to liberation.",
        source: "Ratnatraya"
    },
    {
        id: 35,
        text: "As a mirror reflects an object without being affected by it, so the soul reflects the universe without being affected by it.",
        source: "Jain Metaphor"
    },
    {
        id: 36,
        text: "Forgiveness is the door to liberation.",
        source: "Jain Wisdom"
    },
    {
        id: 37,
        text: "Do pratikraman (introspection) daily to cleanse the soul of its impurities.",
        source: "Daily Practice"
    },
    {
        id: 38,
        text: "Speak only that which is true, pleasant, and beneficial.",
        source: "Satya (Truth)"
    },
    {
        id: 39,
        text: "Stealing is not just taking what is not given, but also taking more than what is needed.",
        source: "Asteya (Non-stealing)"
    },
    {
        id: 40,
        text: "Chastity is the highest penance.",
        source: "Brahmacharya"
    },
    {
        id: 41,
        text: "The more you get, the more you want. The greed increases with the gain.",
        source: "Lord Mahavira"
    },
    {
        id: 42,
        text: "Fight with yourself, why fight with external foes? He, who conquers himself through himself, will obtain happiness.",
        source: "Lord Mahavira"
    },
    {
        id: 43,
        text: "Just as a candle cannot burn without fire, men cannot live without a spiritual life.",
        source: "Buddha (Shared Wisdom)"
    },
    {
        id: 44,
        text: "Let your religion be the religion of compassion.",
        source: "Jain Precept"
    },
    {
        id: 45,
        text: "The universe is not created, nor sustained by anyone. It is self-sustaining.",
        source: "Jain Cosmology"
    },
    {
        id: 46,
        text: "Your soul is your own, and you have to make it.",
        source: "Lord Mahavira"
    },
    {
        id: 47,
        text: "Peace comes from within. Do not seek it without.",
        source: "Lord Mahavira"
    },
    {
        id: 48,
        text: "The tongue is like a sharp knife, it kills without drawing blood.",
        source: "Jain Proverb"
    },
    {
        id: 49,
        text: "Be kind to all creatures; this is the true religion.",
        source: "Lord Mahavira"
    },
    {
        id: 50,
        text: "Soul is the central point of spiritual discipline.",
        source: "Acharya Mahapragya"
    }
];

// Export for use in main.js
if (typeof module !== 'undefined') {
    module.exports = jainQuotes;
} else {
    window.jainQuotes = jainQuotes;
}
