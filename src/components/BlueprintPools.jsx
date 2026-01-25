import React, { useState, useEffect, useMemo } from 'react';
import { generatePoolsData } from '../data/blueprintPools';
import '../styles/BlueprintPools.css';

function BlueprintPools() {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [weaponFilter, setWeaponFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [poolFilter, setPoolFilter] = useState('ALL');

  // modal state
  const [modalImages, setModalImages] = useState(null);
  const [zoom, setZoom] = useState(1);

  // keyboard controls for modal
  useEffect(() => {
    const handleKey = (e) => {
      if (!modalImages) return;

      if (e.key === 'Escape') {
        setModalImages(null);
        setZoom(1);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalImages]);

  useEffect(() => {
    fetch('/weapons.json')
      .then(response => response.json())
      .then(data => {
        const poolsData = generatePoolsData(data);
        setPools(poolsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading pools:', error);
        setLoading(false);
      });
  }, []);

  // normalize search
  const normalize = (str) =>
    str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  const filteredWeapons = useMemo(() => {
    const weapons = new Set();
    pools.forEach(pool => {
      pool.blueprints.forEach(bp => {
        if (bp.status !== 'RELEASED') return;

        const matchesSearch =
          searchTerm === '' ||
          normalize(bp.name).includes(normalize(searchTerm)) ||
          normalize(bp.weapon).includes(normalize(searchTerm));

        const matchesCategory =
          categoryFilter === 'ALL' || bp.category === categoryFilter;

        const matchesPool =
          poolFilter === 'ALL' || pool.poolNumber === parseInt(poolFilter);

        if (matchesSearch && matchesCategory && matchesPool) {
          weapons.add(bp.weapon);
        }
      });
    });
    return Array.from(weapons).sort();
  }, [pools, searchTerm, categoryFilter, poolFilter]);

  const filteredCategories = useMemo(() => {
    const categories = new Set();
    pools.forEach(pool => {
      pool.blueprints.forEach(bp => {
        if (bp.status !== 'RELEASED') return;

        const matchesSearch =
          searchTerm === '' ||
          normalize(bp.name).includes(normalize(searchTerm)) ||
          normalize(bp.weapon).includes(normalize(searchTerm));

        const matchesWeapon =
          weaponFilter === 'ALL' || bp.weapon === weaponFilter;

        const matchesPool =
          poolFilter === 'ALL' || pool.poolNumber === parseInt(poolFilter);

        if (matchesSearch && matchesWeapon && matchesPool) {
          categories.add(bp.category);
        }
      });
    });
    return Array.from(categories).sort();
  }, [pools, searchTerm, weaponFilter, poolFilter]);

  const filteredPools = useMemo(() => {
    const nums = new Set();
    pools.forEach(pool => {
      pool.blueprints.forEach(bp => {
        if (bp.status !== 'RELEASED') return;

        const matchesSearch =
          searchTerm === '' ||
          normalize(bp.name).includes(normalize(searchTerm)) ||
          normalize(bp.weapon).includes(normalize(searchTerm));

        const matchesWeapon =
          weaponFilter === 'ALL' || bp.weapon === weaponFilter;

        const matchesCategory =
          categoryFilter === 'ALL' || bp.category === categoryFilter;

        if (matchesSearch && matchesWeapon && matchesCategory) {
          nums.add(pool.poolNumber);
        }
      });
    });
    return Array.from(nums).sort((a, b) => a - b);
  }, [pools, searchTerm, weaponFilter, categoryFilter]);

  const filteredBlueprints = useMemo(() => {
    const allBlueprints = [];

    pools.forEach(pool => {
      pool.blueprints.forEach(bp => {
        if (bp.status === 'RELEASED') {
          allBlueprints.push({ ...bp, pool: pool.poolNumber });
        }
      });
    });

    return allBlueprints.filter(bp => {
      const matchesSearch =
        searchTerm === '' ||
        normalize(bp.name).includes(normalize(searchTerm)) ||
        normalize(bp.weapon).includes(normalize(searchTerm));

      const matchesWeapon =
        weaponFilter === 'ALL' || bp.weapon === weaponFilter;

      const matchesCategory =
        categoryFilter === 'ALL' || bp.category === categoryFilter;

      const matchesPool =
        poolFilter === 'ALL' || bp.pool === parseInt(poolFilter);

      return (
        matchesSearch &&
        matchesWeapon &&
        matchesCategory &&
        matchesPool
      );
    });
  }, [pools, searchTerm, weaponFilter, categoryFilter, poolFilter]);

  if (loading) {
    return (
      <div className="pools-container">
        <p>Loading pools...</p>
      </div>
    );
  }

  return (
    <div className="pools-container">

      <div className="pools-header">
        <h1>Blueprint Pools</h1>
        <p>Browse all weapon blueprints organized by pool</p>
      </div>

      <div className="pools-filters">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search blueprints or weapons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <div className="filter-group">
            <label htmlFor="pool-filter">Pool:</label>
            <select
              id="pool-filter"
              value={poolFilter}
              onChange={(e) => setPoolFilter(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Pools</option>
              {filteredPools.map(poolNum => (
                <option key={poolNum} value={poolNum}>
                  Pool {poolNum}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="category-filter">Category:</label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Categories</option>
              {filteredCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="weapon-filter">Weapon:</label>
            <select
              id="weapon-filter"
              value={weaponFilter}
              onChange={(e) => setWeaponFilter(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">All Weapons</option>
              {filteredWeapons.map(weapon => (
                <option key={weapon} value={weapon}>{weapon}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="blueprints-table-wrapper">
        <div className="blueprints-count">
          Showing {filteredBlueprints.length} blueprint
          {filteredBlueprints.length !== 1 ? 's' : ''}
        </div>

        <table className="blueprints-table">
          <thead>
            <tr>
              <th>Pool</th>
              <th>Blueprint Name</th>
              <th>Weapon</th>
              <th>Category</th>
              <th>Status</th>
              <th>Image</th>
            </tr>
          </thead>

          <tbody>
            {filteredBlueprints.length > 0 ? (
              filteredBlueprints.map(bp => (
                <tr key={bp.id} className={`status-${bp.status.toLowerCase()}`}>
                  <td className="pool-cell">Pool {bp.pool}</td>
                  <td className="name-cell">{bp.name}</td>
                  <td className="weapon-cell">{bp.weapon}</td>
                  <td className="category-cell">{bp.category}</td>
                  <td className="status-cell">
                    <span className={`status-badge status-${bp.status.toLowerCase()}`}>
                      {bp.status}
                    </span>
                  </td>
                  <td className="image-cell">
                    <button
                      className="view-button"
                      onClick={() => {
                        setModalImages(bp.images);
                        setZoom(1);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results">
                  No blueprints found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalImages && (
        <div
          className="image-modal-overlay"
          onClick={() => {
            setModalImages(null);
            setZoom(1);
          }}
        >
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <img
              alt="Blueprint"
              ref={(img) => {
                if (img) {
                  let index = 0;
                  const tryNext = () => {
                    if (index < modalImages.length) {
                      img.src = modalImages[index++];
                    }
                  };
                  img.onerror = tryNext;
                  tryNext();
                }
              }}
            />


            <button
              className="close-modal"
              onClick={() => {
                setModalImages(null);
                setZoom(1);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default BlueprintPools;
