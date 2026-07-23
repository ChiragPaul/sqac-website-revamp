exports.getTeam = async (req, res) => {
  try {
    const response = await fetch('https://sqac-member-form-1.onrender.com/api/getdata');
    if (!response.ok) {
      throw new Error(`Failed to fetch from Gateway: ${response.statusText}`);
    }
    
    const json = await response.json();
    const rawMembers = json.data || [];

    const formattedMembers = rawMembers.map((member) => {
      const name = member.name || 'Unknown Member';
      const nameParts = name.split(' ');
      const initials = nameParts.length > 1 
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        : (nameParts[0] ? nameParts[0].substring(0, 2).toUpperCase() : 'SQ');

      let domain = 'Technical';
      let role = member.position || 'Member';
      let subDomain = member.subdomain || '';
      
      const posLow = role.toLowerCase();
      const coreLow = (member.coredomain || '').toLowerCase();
      const subLow = subDomain.toLowerCase();
      
      if (posLow === 'board member' || posLow === 'board-member' || coreLow === 'board member') {
        domain = 'Board';
      } else if (coreLow === 'media' || subLow.includes('creative') || subLow.includes('pr') || subLow.includes('media') || subLow.includes('design')) {
        domain = 'Media';
      } else if (coreLow === 'technical') {
        domain = 'Technical';
      } else if (coreLow === 'corporate') {
        domain = 'Corporate';
      } else if (coreLow === 'both') {
        if (subLow.includes('web') || subLow.includes('app') || subLow.includes('ai') || subLow.includes('ml')) {
          domain = 'Technical';
        } else {
          domain = 'Corporate';
        }
      }

      let contributions = [
        'Contributed to core team initiatives and deliverables.',
        'Collaborated across domains to support SQAC activities.'
      ];
      if (domain === 'Technical') {
        contributions = [
          'Developed and optimized core software modules.',
          'Ensured code quality through rigorous testing and code reviews.'
        ];
      } else if (domain === 'Corporate') {
        contributions = [
          'Managed corporate partnerships and sponsor outreach.',
          'Organized and coordinated logistics for major events.'
        ];
      } else if (domain === 'Media') {
        contributions = [
          'Designed high-fidelity UI/UX mockups and graphic assets.',
          'Led public relations campaigns and social media presence.'
        ];
      } else if (domain === 'Board') {
        contributions = [
          'Shaped the strategic vision and direction of SQAC.',
          'Mentored members and oversaw operations across all domains.'
        ];
      }

      const roleName = role || 'Core Member';
      const bio = `${name} is a dedicated ${roleName.toLowerCase()} at SQAC, focusing on driving quality, collaboration, and excellence across projects.`;

      return {
        id: member._id || Math.random().toString(),
        name,
        initials,
        role,
        bio,
        contributions,
        domain,
        subDomain,
        position: role,
        pic: member.pic || '',
        linkedin: member.linkdln || '#',
        github: member.github || '#',
        portfolio: member.insta || '#'
      };
    });

    res.json(formattedMembers);
  } catch (err) {
    console.error('Error fetching team data:', err);
    res.status(500).json({ message: err.message });
  }
};
