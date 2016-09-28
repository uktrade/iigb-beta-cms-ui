module.exports = {
    title: 'Structure',
    children: [{
        "title": "Home",
        "url": "/",
        "layout": "templates/us/home.html",
        "sections": {
            "reasons_to_choose": "content/Reasons to chose the UK/us.html",
            "key_factors": "content/Key sectors/us.html",
            "investment_intro": "content/investment-guide/us.md",
            "investment_steps": [
                "content/investment-guide/establish-a-UK-address/us.md",
                "content/investment-guide/apply-for-a-visa/us.md",
                "content/investment-guide/open-a-UK-bank-account/the process/us.md",
                "content/investment-guide/register-your-company/us.md",
                "content/investment-guide/work-out-your-profit-margins-against-UK-tax/key business taxes/us.md",
                "content/investment-guide/understand-UK-employment-law/us.md",
                "content/investment-guide/familiarise-yourself-with-the-legal-framework/a renowned legal system/us.md"
            ]
        },
        "children": [{
            "title": "Investment Guide",
            "url": "investment-guide",
            "layout": "templates/sectors-page.html",
            "sections": {
                "investment_intro": "content/investment-guide/us.md",
                "investment_steps": [
                    "content/investment-guide/establish-a-UK-address/us.md",
                    "content/investment-guide/apply-for-a-visa/us.md",
                    "content/investment-guide/open-a-UK-bank-account/the process/us.md",
                    "content/investment-guide/register-your-company/us.md",
                    "content/investment-guide/work-out-your-profit-margins-against-UK-tax/key business taxes/us.md",
                    "content/investment-guide/understand-UK-employment-law/us.md",
                    "content/investment-guide/familiarise-yourself-with-the-legal-framework/a renowned legal system/us.md"
                ]
            }
        },
        {
            "title": "Sections",
            "url": "sections",
            "layout": "templates/sections.html",
            "sections": {
                "sections_intro": "content/sections/us.md",
                "sections_children": []
            },
            "children": [{
                "title": "Creative sector",
                "url": "sectors/creative",
                "layout": "templates/sector.html",
                "sections": {
                    "sectors_intro": "content/creative/us.md",
                    "sectors_sections": [
                        "content/creative/the-creative-sector-in-Great-Britain.md",
                        "content/creative/economic-environment-for-growth.md",
                        "content/creative/the-labour-market-and-creative-talent.md",
                        "content/creative/advanced-infrastructure-and-regional-strength.md",
                        "content/creative/regulatory-and-financial-support-for-creative-companies.md",
                        "content/creative/next-steps-and-contacts.md"
                    ]
                },
                "children": [{
                    "title": "Digital media",
                    "url": "sectors/creative/digital-media",
                    "layout": "templates/subsector.html",
                    "sections": {
                        "sectors_intro": "content/digital-media/us.md",
                        "sectors_sections": [
                            "content/digital-media/digital-media-sector-in-Great-Britain.md",
                            "content/digital-media/an-environment-for-growth.md",
                            "content/digital-media/strong-areas-of-opportunity.md",
                            "content/digital-media/a-skilled-and-creative-talent-pool.md",
                            "content/digital-media/londons-global-status-and-regional-growth.md",
                            "content/digital-media/support-for-investment.md",
                            "content/digital-media/next-steps-and-contacts.md"
                        ]
                    }
                }]
            },
            {
                "title": "Automotive sector",
                "url": "sectors/automotive",
                "layout": "templates/sector.html",
                "sections": {
                    "sectors_intro": "content/automotive/us.md",
                    "sectors_sections": [
                        "content/automotive/the-automotive-sector-in-Great-Britain.md",
                        "content/automotive/economic-environment-for-growth.md",
                        "content/automotive/the-labour-market-and-automotive-talent.md",
                        "content/automotive/advanced-infrastructure-and-regional-strength.md",
                        "content/automotive/regulatory-and-financial-support-for-automotive-companies.md",
                        "content/automotive/next-steps-and-contacts.md"
                    ]
                },
                "children": [{
                    "title": "Motor sport",
                    "url": "sectors/automotive/motor-sport",
                    "layout": "templates/subsector.html",
                    "sections": {
                        "sectors_intro": "content/motor-sport/us.md",
                        "sectors_sections": [
                            "content/motor-sport/motor-sport-sector-in-Great-Britain.md",
                            "content/motor-sport/an-environment-for-growth.md",
                            "content/motor-sport/strong-areas-of-opportunity.md",
                            "content/motor-sport/a-skilled-and-automotive-talent-pool.md",
                            "content/motor-sport/londons-global-status-and-regional-growth.md",
                            "content/motor-sport/support-for-investment.md",
                            "content/motor-sport/next-steps-and-contacts.md"
                        ]
                    }
                },
                {
                    "title": "R&D",
                    "url": "sectors/automotive/research-and-development",
                    "layout": "templates/subsector.html",
                    "sections": {
                        "sectors_intro": "content/research-and-development/us.md",
                        "sectors_sections": [
                            "content/research-and-development/research-and-development-sector-in-Great-Britain.md",
                            "content/research-and-development/an-environment-for-growth.md",
                            "content/research-and-development/strong-areas-of-opportunity.md",
                            "content/research-and-development/a-skilled-and-automotive-talent-pool.md",
                            "content/research-and-development/londons-global-status-and-regional-growth.md",
                            "content/research-and-development/support-for-investment.md",
                            "content/research-and-development/next-steps-and-contacts.md"
                        ]
                    }
                },
                {
                    "title": "Supply chain",
                    "url": "sectors/automotive/supply-chain",
                    "layout": "templates/subsector.html",
                    "sections": {
                        "sectors_intro": "content/supply-chain/us.md",
                        "sectors_sections": [
                            "content/supply-chain/supply-chain-sector-in-Great-Britain.md",
                            "content/supply-chain/an-environment-for-growth.md",
                            "content/supply-chain/strong-areas-of-opportunity.md",
                            "content/supply-chain/a-skilled-and-automotive-talent-pool.md",
                            "content/supply-chain/londons-global-status-and-regional-growth.md",
                            "content/supply-chain/support-for-investment.md",
                            "content/supply-chain/next-steps-and-contacts.md"
                        ]
                    }
                }]
            },
            {
                "title": "Financial sector",
                "url": "sectors/financial",
                "layout": "templates/sector.html",
                "sections": {
                    "sectors_intro": "content/financial/us.md",
                    "sectors_sections": [
                        "content/financial/the-financial-sector-in-Great-Britain.md",
                        "content/financial/economic-environment-for-growth.md",
                        "content/financial/the-labour-market-and-financial-talent.md",
                        "content/financial/advanced-infrastructure-and-regional-strength.md",
                        "content/financial/regulatory-and-financial-support-for-financial-companies.md",
                        "content/financial/next-steps-and-contacts.md"
                    ]
                },
                "children": [{
                    "title": "Asset management",
                    "url": "sectors/creative/asset-management",
                    "layout": "templates/subsector.html",
                    "sections": {
                        "sectors_intro": "content/asset-management/us.md",
                        "sectors_sections": [
                            "content/asset-management/asset-management-sector-in-Great-Britain.md",
                            "content/asset-management/an-environment-for-growth.md",
                            "content/asset-management/strong-areas-of-opportunity.md",
                            "content/asset-management/a-skilled-and-creative-talent-pool.md",
                            "content/asset-management/londons-global-status-and-regional-growth.md",
                            "content/asset-management/support-for-investment.md",
                            "content/asset-management/next-steps-and-contacts.md"
                        ]
                    }
                },
                {
                    "title": "Financial technology",
                    "url": "sectors/creative/financial-technology",
                    "layout": "templates/subsector.html",
                    "sections": {
                        "sectors_intro": "",
                        "sectors_sections": [
                            "content/financial-technology/financial-technology-sector-in-Great-Britain.md",
                            "content/financial-technology/an-environment-for-growth.md",
                            "content/financial-technology/strong-areas-of-opportunity.md",
                            "content/financial-technology/a-skilled-and-creative-talent-pool.md",
                            "content/financial-technology/londons-global-status-and-regional-growth.md",
                            "content/financial-technology/support-for-investment.md",
                            "content/financial-technology/next-steps-and-contacts.md"
                        ]
                    }
                }]
            }]
        }]
    }]
}
